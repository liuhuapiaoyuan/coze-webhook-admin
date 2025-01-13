import { t } from "elysia";

export const headerParams = t.Object({
  authorization: t.Union([t.String(), t.Literal("")], {
    description: "API Key",
    allowExtraProperties: true,
  }),
});
