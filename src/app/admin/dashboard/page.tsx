import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Webhook, WebhookOff, Loader2, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Welcome } from "./_components/welcome";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getStats() {
  const [
    totalWebhooks,
    totalApiEndpoints,
    totalApiKeys,
    totalLogs,
    recentLogs,
    endpointStats,
  ] = await Promise.all([
    db.cozeWebhook.count(),
    db.apiEndpoint.count(),
    db.apiKey.count(),
    db.apiEndpointLog.count(),
    db.apiEndpointLog.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        apiEndpoint: true,
      },
    }),
    db.apiEndpoint.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            logs: true,
          },
        },
      },
      orderBy: {
        logs: {
          _count: "desc",
        },
      },
      take: 5,
    }),
  ]);

  // 计算平均响应时间
  const avgDuration = await db.apiEndpointLog.aggregate({
    _avg: {
      duration: true,
    },
  });

  return {
    totalWebhooks,
    totalApiEndpoints,
    totalApiKeys,
    totalLogs,
    recentLogs,
    endpointStats,
    avgDuration: Math.round(avgDuration._avg.duration || 0),
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-2xl font-bold">仪表盘</h1>
      <Welcome />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/webhooks" className="block">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                Webhook总数
              </CardTitle>
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <Webhook className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalWebhooks}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/api-endpoints" className="block">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                API端点总数
              </CardTitle>
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-6 w-6 text-green-700 dark:text-green-300"
                >
                  <path d="M4 21v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7" />
                  <path d="M7 21h10" />
                  <path d="M12 17v-6" />
                  <path d="M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.totalApiEndpoints}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/api-keys" className="block">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                API密钥总数
              </CardTitle>
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-6 w-6 text-purple-700 dark:text-purple-300"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalApiKeys}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/api-logs" className="block">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                平均响应时间
              </CardTitle>
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                <Loader2 className="h-6 w-6 text-amber-700 dark:text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgDuration}ms</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>最近调用记录</CardTitle>
            <CardDescription>显示最近5条API调用记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentLogs.map((log) => (
                <div key={log.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {log.apiEndpoint.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      调用时间：
                      {formatDistanceToNow(new Date(log.createdAt), {
                        addSuffix: true,
                        locale: zhCN,
                      })}
                      {" · "}
                      耗时：{log.duration}ms
                    </p>
                  </div>
                  {log.duration && log.status === "success" && (
                    <WebhookOff
                      className={cn(
                        "ml-auto h-4 w-4 text-green-500",
                        log.duration > 2000 && "text-yellow-500",
                        log.duration > 5000 && "text-red-500"
                      )}
                    />
                  )}
                  {log.status === "failed" && (
                    <ShieldAlert className="ml-auto h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>调用量TOP5的API端点</CardTitle>
            <CardDescription>按调用次数排序的前5个API端点</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.endpointStats.map((endpoint) => (
                <div key={endpoint.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {endpoint.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      调用次数：{endpoint._count.logs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
