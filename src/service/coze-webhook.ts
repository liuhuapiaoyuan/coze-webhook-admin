import { MemoryCache } from "@/lib/cache";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
type CozeCache = {
  logId: string;
  start: number;
  data?: string;
  status: "success" | "wait";
};
declare global {
  // eslint-disable-next-line no-var
  var WebhookCache: MemoryCache<CozeCache>;
}

if (!global.WebhookCache) {
  global.WebhookCache = new MemoryCache<CozeCache>();
}
export const WebhookCache = global.WebhookCache;

export class CozeWebhookService {
  static async getClient(id: string) {
    const webhook = await db.cozeWebhook.findUnique({
      where: {
        id,
      },
    });

    if (!webhook) {
      throw new CozeWebhookError("webhook not found");
    }

    return new CozeWebhook({
      url: webhook.url,
      id: webhook.id,
      authorization: webhook.authorization,
    });
  }
}

class CozeWebhookError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CozeWebhookError";
  }
}

export class CozeWebhook {
  url: string;
  authorization: string;
  id: string;
  callback: string;
  constructor({
    url,
    id,
    authorization,
    callback,
  }: {
    url: string;
    id: string;
    authorization: string;
    callback?: string;
  }) {
    this.id = id;
    this.url = url;
    this.authorization = authorization;
    this.callback = callback ?? `${process.env.DOMAIN_URL}/webhook/${id}`;
  }

  //   转发给coze
  async send(
    apiEndpointId: string,
    apiKey: string,
    data: Record<string, string>
  ) {
    const hookId = uuidv4();
    const log = await db.apiEndpointLog.create({
      data: {
        apiEndpointId: apiEndpointId,
        cozeWebhookId: this.id,
        requestParams: JSON.stringify(data),
        apiKey: apiKey,
      },
    });
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authorization}`,
      },
      body: JSON.stringify({
        ...data,
        hookId,
        callback: this.callback,
      }),
    });
    const result = (await response.json()) as {
      code: number;
      message: string;
    };
    if (result.code != 0) {
      throw new CozeWebhookError(result.message);
    }

    await WebhookCache.set(hookId, {
      logId: log.id,
      start: Date.now(),
      status: "success",
    });

    return {
      hookId,
      data: result,
    };
  }

  async query(hookId: string) {
    const hook = WebhookCache.get(hookId);
    if (!hook) {
      throw new CozeWebhookError("hook not found");
    }
    return hook;
  }

  async complte(hookId: string, data: string) {
    const hook = await WebhookCache.get(hookId);
    if (!hook) {
      throw new CozeWebhookError("hook not found");
    }

    await db.apiEndpointLog.update({
      data: {
        duration: Date.now() - hook.start,
        response: data,
        status: "success",
      },
      where: {
        id: hook.logId,
      },
    });

    await WebhookCache.update(
      hookId,
      {
        data,
        status: "success",
      },
      60 * 1000
    );
    return {
      hookId,
      data,
    };
  }
}
