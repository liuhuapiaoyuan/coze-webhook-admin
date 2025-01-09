import { getDigitalHumanStats } from "@/service/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";
import {
  Users,
  TabletSmartphone,
  Bot,
  ShoppingBag,
  Clock,
  Mic,
} from "lucide-react";

export async function DashboardStats() {
  const stats = await getDigitalHumanStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link href="/users">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-1))] to-[hsl(var(--chart-1))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平台用户数</CardTitle>
            <Users className="h-8 w-8 text-[hsl(var(--chart-1))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userCount}</div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/devices">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-2))] to-[hsl(var(--chart-2))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">激活设备数</CardTitle>
            <TabletSmartphone className="h-8 w-8 text-[hsl(var(--chart-2))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDeviceCount}</div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/digital-humans">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-3))] to-[hsl(var(--chart-3))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">数字人总数</CardTitle>
            <Bot className="h-8 w-8 text-[hsl(var(--chart-3))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCount}</div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/digital-humans">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-4))] to-[hsl(var(--chart-4))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已上架数字人</CardTitle>
            <ShoppingBag className="h-8 w-8 text-[hsl(var(--chart-4))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedCount}</div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/digital-humans">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-5))] to-[hsl(var(--chart-5))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总服务时长</CardTitle>
            <Clock className="h-8 w-8 text-[hsl(var(--chart-5))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(stats.totalServiceTime)}
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/voices">
        <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 rounded-2xl bg-gradient-to-b from-white/50 to-white/80 dark:from-purple-900/20 dark:to-gray-900/90 backdrop-blur-xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--chart-1))] to-[hsl(var(--chart-1))] opacity-[0.08] dark:opacity-20 rounded-2xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">语音风格</CardTitle>
            <Mic className="h-8 w-8 text-[hsl(var(--chart-1))] opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.voiceCount}个</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
