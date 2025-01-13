import { t } from "elysia";

export const chatCompletionReq = t.Object({
  model: t.String({ description: "模型ID" }),
  messages: t.Array(
    t.Object(
      {
        role: t.Enum({
          //"system", "user", "assistant"
          system: "system",
          user: "user",
          assistant: "assistant",
        }),
        content: t.String({
          description: "消息内容",
        }),
      },
      {
        description: "消息",
      }
    ),
    {
      description: "消息列表",
    }
  ),
});

export const chatCompletionResp = t.Nullable(
  t.Object({
    id: t.String({ description: "唯一标识符" }),
    object: t.String({ description: "对象类型" }),
    created: t.Number({ description: "创建时间戳" }),
    model: t.String({ description: "使用的模型" }),
    systemfingerprint: t.String({ description: "系统指纹" }),
    choices: t.Array(
      t.Object({
        index: t.Number({ description: "选择索引" }),
        message: t.Object({
          role: t.String(),
          content: t.String({ description: "助手回复内容" }),
        }),
        logprobs: t.Null(),
        finishreason: t.String({ description: "结束原因" }),
      }),
      { description: "回复选项列表" }
    ),
    usage: t.Object({
      prompttokens: t.Number({ description: "提示令牌数" }),
      completiontokens: t.Number({ description: "完成令牌数" }),
      totaltokens: t.Number({ description: "总令牌数" }),
      promptcachehittokens: t.Number({ description: "提示缓存命中令牌数" }),
      promptcachemisstokens: t.Number({ description: "提示缓存未命中令牌数" }),
    }),
  })
);
