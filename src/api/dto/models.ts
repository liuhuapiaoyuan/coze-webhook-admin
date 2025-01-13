import { t } from "elysia";

export const ModelList = t.Array(
  t.Object({
    id: t.String({ description: "模型ID" }),
    name: t.String({ description: "模型名称" }),
    object: t.String({ description: "对象类型" }),
    organization: t.String({ description: "所属组织" }),
  })
);
