import { db } from "@/lib/db";
import { CozeWebhook } from "./coze-webhook";

export class ApiEndpointsService {
  /**
   * Retrieves an API endpoint by its ID
   * @param {string} id - The unique identifier of the API endpoint
   * @returns {Promise<Object>} A promise that resolves to an object containing the API endpoint data and its path
   * @throws {Error} If the API endpoint is not found
   */
  static async getApiendpoint(id: string) {
    const apiEndpoint = await db.apiEndpoint.findUnique({
      where: { id },
      include: {
        cozeWebhook: true,
      },
    });

    if (!apiEndpoint) {
      throw new Error("API endpoint not found");
    }

    const path =
      apiEndpoint.type === "openaiLike"
        ? "/api/v1/chat/completion"
        : `/api/v1/${apiEndpoint.id}`;

    return {
      ...apiEndpoint,
      path,
    };
  }

  /**
   * 获得coze的操作
   * @param apiKey
   * @param id
   * @returns
   */
  static async getClient(
    apiKey: string,
    id: string,
    type?: "openaiLike" | "request"
  ) {
    const apiKeys = await db.apiKey.findFirst({
      where: {
        key: apiKey,
        apiEndpoints: {
          some: type
            ? {
                id,
                type,
              }
            : {
                id,
              },
        },
      },
      include: {
        apiEndpoints: {
          include: {
            cozeWebhook: true,
          },
        },
      },
    });

    if (!apiKeys) {
      throw new Error("API key Or API endpoint not found");
    }
    const apiEndpoint = apiKeys.apiEndpoints.find((item) => item.id === id);

    if (!apiEndpoint) {
      throw new Error("API key Or API endpoint not found");
    }
    const coze = new CozeWebhook(apiEndpoint.cozeWebhook);

    return {
      coze,
      /**
       * 发送
       * @param data
       * @returns
       */
      send: (data: Record<string, string>) => {
        return coze.send(apiEndpoint.id, apiKey, data);
      },
      /**
       * 简化请求过程，等待coze返回并获得计算结果
       * @param data
       * @param options
       * @returns
       */
      request: async (
        data: Record<string, string>,
        options: {
          timeout?: number;
          maxAttempts?: number;
        } = {}
      ) => {
        const { hookId } = await coze.send(apiEndpoint.id, apiKey, data);
        let result: string | undefined;
        let attempts = 0;
        const maxAttempts = options.maxAttempts ?? 30;
        while (!result && attempts < maxAttempts) {
          const query = await coze.query(hookId);
          result = query?.status === "success" ? query?.data : "";
          if (!result) {
            await new Promise((resolve) =>
              setTimeout(resolve, options.timeout ?? 300)
            );
          }
          attempts++;
        }
        if (!result) {
          throw new Error("Max query attempts reached");
        }
        return JSON.parse(result);
      },
    };
  }

  //   将所有创建时间在1小时前，并且duration:null的api-logs 都标记为失败
  static async markFailedLogs() {
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    await db.apiEndpointLog.updateMany({
      where: {
        createdAt: {
          lt: tenMinutesAgo,
        },
        duration: null,
      },
      data: {
        duration: 0,
        status: "failed",
      },
    });
  }
}
