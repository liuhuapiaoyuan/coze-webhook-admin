import { NextRequest } from "next/server";
import { CozeWebhookService } from "@/service/coze-webhook";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const json = await request.json();
  const coze = await CozeWebhookService.getClient(id);
  if ("action" in json) {
    const action = json.action as string;
    if (action === "query") {
      const hookId = json.hookId;
      const result = await coze.query(hookId);
      return Response.json(result);
    }
    if (action === "callback" && "hookId" in json && "body" in json) {
      const hookId = json.hookId;
      const data = json.body;
      const result = await coze.complte(
        hookId,
        typeof data === "string" ? data : JSON.stringify(data)
      );
      return Response.json(result);
    }
  }
  return Response.json({ error: "invalid action" });
}
