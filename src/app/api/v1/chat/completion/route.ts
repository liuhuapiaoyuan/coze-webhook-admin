import { ApiEndpointsService } from "@/service/api-endpoints.service";
import { chatCompletionSchema } from "./schema";
import { v4 as uuidv4 } from "uuid";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const parsed = chatCompletionSchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const chat = parsed.data;
    const coze = await ApiEndpointsService.getClient(
      apiKey.slice(7),
      chat.model
    );
    const system_prompt =
      chat.messages?.find((item) => item.role === "system")?.content ??
      "You are a helpful assistant.";
    const { hookId } = await coze.send({
      prompt: chat.messages
        .filter((item) => item.role !== "system")
        .map((item) => {
          return `${item.role}: ${item.content}`;
        })
        .join("\n--\n"),
      system_prompt,
    });
    let result: string | undefined;
    let attempts = 0;
    const maxAttempts = 30;
    while (!result && attempts < maxAttempts) {
      const query = await coze.coze.query(hookId);
      result = query?.status === "success" ? query?.data : "";
      if (!result) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      attempts++;
    }
    if (!result) {
      throw new Error("Max query attempts reached");
    }

    const cozeResponse = JSON.parse(result) as { content: string };

    return Response.json({
      id: uuidv4(),
      object: "chat.completion",
      created: Date.now(),
      model: chat.model,
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
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: message }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export function GET() {
  return new Response("Hello!");
}
