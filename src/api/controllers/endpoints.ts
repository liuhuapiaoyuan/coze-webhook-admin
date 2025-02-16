import Elysia, { t } from "elysia";
import { apiKey } from "../middlewares/apikey";
import { ModelList } from "../dto/models";
import { db } from "@/lib/db";
import { ApiEndpointsService } from "@/service/api-endpoints.service";
import { chatCompletionReq, chatCompletionResp } from "../dto/chatComplection";
import { v4 as uuidv4 } from "uuid";
import { headerParams } from "../dto/headers";

export const endpoints = new Elysia({
  prefix: "/v1",
  detail: {
    description: "API端点管理",
  },
})
  .use(apiKey())

  .get(
    "/models",
    async ({ Auth: { apiKey } }) => {
      if (!apiKey) return [];
      const endpoints = await db.apiEndpoint.findMany({
        where: {
          apiKeys: {
            some: {
              id: apiKey.id,
            },
          },
          type: "openaiLike",
        },
      });

      return endpoints.map((item) => ({
        id: item.id,
        name: item.name,
        object: "model",
        organization: "*",
      }));
    },
    {
      response: ModelList,
      detail: {
        description: "获取可用的模型列表",
      },
    }
  )
  .post(
    "/:api_id",
    async ({ body, params: { api_id }, Auth: { apiKey } }) => {
      if (!apiKey) throw new Error("API key not found");
      const coze = await ApiEndpointsService.getClient(
        apiKey.key,
        api_id,
        "request"
      );
      return await coze.request(body as Record<string, string>, {
        maxAttempts: 60,
      });
    },
    {
      params: t.Object({
        api_id: t.String({ description: "API端点ID" }),
      }),
      body: t.Any({}),
      detail: {
        description: "调用API端点",
      },
      headers: headerParams,
    }
  )
  .post(
    "/chat/completion",
    async ({ body, Auth: { apiKey } }) => {
      if (!apiKey) throw new Error("API key not found");

      const coze = await ApiEndpointsService.getClient(
        apiKey.key,
        body.model,
        "openaiLike"
      );
      if (!coze) {
        throw new Error("API endpoint not found");
      }
      const system_prompt =
        body.messages?.find((item) => item.role === "system")?.content ??
        "You are a helpful assistant.";
      const resp = await coze.request({
        prompt: body.messages
          .filter((item) => item.role !== "system")
          .map((item) => {
            return `${item.role}: ${item.content}`;
          })
          .join("\n--\n"),
        system_prompt,
      });

      const cozeResponse = resp as { content: string };
      return {
        id: uuidv4(),
        object: "chat.completion",
        created: Date.now(),
        model: body.model,
        systemfingerprint: "fp_3a5770e1b4",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: cozeResponse.content,
            },
            logprobs: null,
            finishreason: "stop",
          },
        ],
        usage: {
          prompttokens: 11,
          completiontokens: 11,
          totaltokens: 22,
          promptcachehittokens: 0,
          promptcachemisstokens: 11,
        },
      };
    },
    {
      body: chatCompletionReq,
      response: chatCompletionResp,
      headers: headerParams,
      detail: {
        description: "Openai风格的对话",
      },
    }
  );
