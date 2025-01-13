import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiEndpoint } from "@prisma/client";
import { KeysList } from "./keys-list";
import { RecordsList } from "./records-list";
import { Suspense } from "react";
import { CopyButton } from "./copy-button";

interface DetailTabsProps {
  apiEndpoint: ApiEndpoint & {
    path: string;
  };
}

function generateCurlCommand(
  baseUrl: string,
  apiEndpoint: ApiEndpoint & { path: string }
) {
  if (apiEndpoint.type === "openaiLike") {
    return `curl -X POST \\
${baseUrl}${apiEndpoint.path} \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <YOUR_API_KEY>" \\
-d '{
      "model": "${apiEndpoint.id}",
      "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
      ],
      "stream": false
    }'
`;
  } else if (apiEndpoint.type === "request") {
    return `curl -X POST \\
${baseUrl}${apiEndpoint.path} \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <YOUR_API_KEY>" \\
-d '{ "foo": "bar" }'
`;
  }
  return "";
}

export async function DetailTabs({ apiEndpoint }: DetailTabsProps) {
  const baseUrl = process.env.DOMAIN_URL!;
  const curlCommand = generateCurlCommand(baseUrl, apiEndpoint);

  return (
    <Tabs defaultValue="method" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="method">调用方法</TabsTrigger>
        <TabsTrigger value="records">调用记录</TabsTrigger>
        <TabsTrigger value="keys">可用密钥</TabsTrigger>
      </TabsList>
      <TabsContent value="method">
        <Card>
          <CardContent className="relative pt-6">
            <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-slate-950 p-4 text-sm text-slate-50">
              {curlCommand}
            </pre>
            <div className="absolute right-8 top-8">
              <CopyButton
                className="bg-slate-950 text-slate-50"
                value={curlCommand}
                toastTitle="已复制"
                toastDescription="内容已复制到剪贴板"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="records">
        <Card>
          <CardContent className="pt-6">
            <Suspense fallback={<div>Loading...</div>}>
              <RecordsList endpointId={apiEndpoint.id} />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="keys">
        <Card>
          <CardContent className="pt-6">
            <Suspense fallback={<div>Loading...</div>}>
              <KeysList endpointId={apiEndpoint.id} />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
