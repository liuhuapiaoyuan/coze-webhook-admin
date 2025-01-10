import { notFound } from "next/navigation";
import { getApiLog } from "../actions";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiLogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApiLogDetailPage({
  params,
}: ApiLogDetailPageProps) {
  const { id } = await params;
  const log = await getApiLog(id);

  if (!log) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">API调用日志详情</h1>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">API端点</dt>
                <dd className="mt-1">
                  <Link
                    href={`/api-endpoints/${log.apiEndpoint.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {log.apiEndpoint.name}
                  </Link>
                  <Badge variant="outline" className="ml-2">
                    {log.apiEndpoint.type === "openaiLike"
                      ? "OpenAI兼容"
                      : "普通请求"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  CozeWebhook
                </dt>
                <dd className="mt-1">
                  <Link
                    href={`/webhooks/${log.cozeWebhook.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {log.cozeWebhook.name}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">API密钥</dt>
                <dd className="mt-1">
                  <code className="rounded bg-muted px-2 py-1">
                    {log.apiKey}
                  </code>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">调用时间</dt>
                <dd className="mt-1">
                  {new Date(log.createdAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">耗时</dt>
                <dd className="mt-1">
                  <span
                    className={
                      (log.duration ?? 0) > 1000
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {log.duration ?? "--"}ms
                  </span>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>请求参数</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4">
              {JSON.stringify(JSON.parse(log.requestParams), null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>响应内容</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4">
              {JSON.stringify(JSON.parse(log.response ?? "{}"), null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
