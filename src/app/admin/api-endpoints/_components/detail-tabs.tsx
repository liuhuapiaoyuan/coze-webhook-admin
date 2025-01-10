import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiEndpoint } from "@prisma/client";
import { KeysList } from "./keys-list";
import { RecordsList } from "./records-list";
import { Suspense } from "react";

interface DetailTabsProps {
  apiEndpoint: ApiEndpoint & {
    path: string;
  };
}

export function DetailTabs({ apiEndpoint }: DetailTabsProps) {
  return (
    <Tabs defaultValue="method" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="method">调用方法</TabsTrigger>
        <TabsTrigger value="records">调用记录</TabsTrigger>
        <TabsTrigger value="keys">可用密钥</TabsTrigger>
      </TabsList>
      <TabsContent value="method">
        <Card>
          <CardContent className="pt-6">
            {apiEndpoint.type === "openaiLike" && (
              <pre className="rounded bg-slate-950 p-4 text-sm text-slate-50">
                {`curl -X POST \\
${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint.path} \\
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
`}
              </pre>
            )}
            {apiEndpoint.type === "request" && (
              <pre className="rounded bg-slate-950 p-4 text-sm text-slate-50">
                {`curl -X POST \\
${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint.path} \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer <YOUR_API_KEY>" \\
-d '{ "foo": "bar" }'
`}
              </pre>
            )}
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
