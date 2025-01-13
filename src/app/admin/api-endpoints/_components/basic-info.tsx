import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiEndpoint } from "@prisma/client";
import Link from "next/link";

interface BasicInfoProps {
  apiEndpoint: ApiEndpoint & {
    path: string;
    cozeWebhook: {
      name: string;
      url: string;
    };
  };
}

export function BasicInfo({ apiEndpoint }: BasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>基本信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-medium">名称:</label>
          <p>{apiEndpoint.name}</p>
        </div>
        <div>
          <label className="font-medium">webhook:</label>
          <p>
            <Link
              className="text-blue-600 hover:underline"
              href={`/admin/webhooks/${apiEndpoint.cozeWebhookId}`}
            >
              {apiEndpoint.cozeWebhook?.name}
            </Link>
          </p>
        </div>
        <div>
          <label className="font-medium">描述:</label>
          <p className="whitespace-pre-wrap">{apiEndpoint.description}</p>
        </div>
        <div>
          <label className="font-medium">路径:</label>
          <p>{apiEndpoint.path}</p>
        </div>
        <div>
          <label className="font-medium">类型:</label>
          <p>{apiEndpoint.type}</p>
        </div>
        <div>
          <label className="font-medium">创建时间:</label>
          <p>{apiEndpoint.createdAt.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
