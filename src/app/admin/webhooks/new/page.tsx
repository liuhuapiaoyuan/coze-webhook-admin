import Image from "next/image";
import { WebhookForm } from "../_components/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewWebhookPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">新建Webhook</h1>
      </div>
      <div className="mb-6 rounded-md border p-4">
        <WebhookForm />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coze Webhook 设置指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src="/coze_webhook_guide.png"
            alt="Coze Webhook 设置指南"
            width={600}
            height={400}
            className="mb-4"
          />
          <ol className="list-inside list-decimal space-y-2">
            <li>打开智能体编辑</li>
            <li>创建触发器，选择web回调</li>
            <li>获得回调的地址跟授权码（注意不需要Bearer）</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
