import { MemoryCache } from "@/lib/cache";
import { v4 as uuidv4 } from "uuid";

const WebhookCache = new MemoryCache<{
  start: number;
  end?: number;
  data?: string;
  status: "success" | "wait";
}>();

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
  async send(data: Record<string, string>) {
    // 调用成功就创建缓存
    const hookId = uuidv4();
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authorization,
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
    await WebhookCache.update(
      hookId,
      {
        data,
        status: "success",
        end: Date.now(),
      },
      60 * 1000
    );
    return {
      hookId,
      data,
    };
  }
}
