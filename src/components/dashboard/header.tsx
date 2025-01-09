import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>仪表盘概览</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            查看数字人运营数据和服务统计
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
