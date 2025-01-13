import { z } from "zod";

export const chatCompletionSchema = z.object({
  model: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string(),
    })
  ),
});

export type ChatCompletion = z.infer<typeof chatCompletionSchema>;
