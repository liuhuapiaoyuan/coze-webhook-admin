import { ApiEndpointsService } from "@/service/api-endpoints.service";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ api_id: string }> }
) {
  const { api_id } = await params;
  const json = await request.json();
  const apiKey = request.headers.get("Authorization");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const coze = await ApiEndpointsService.getClient(apiKey.slice(7), api_id);
    const { hookId } = await coze.send(json);
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

    const cozeResponse = JSON.parse(result);

    return Response.json(cozeResponse);
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
