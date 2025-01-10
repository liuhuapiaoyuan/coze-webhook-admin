"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ApiEndpointLog, ApiEndpoint, CozeWebhook } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ApiLogWithRelations = ApiEndpointLog & {
  apiEndpoint: ApiEndpoint;
  cozeWebhook: CozeWebhook;
};

export const columns: ColumnDef<ApiLogWithRelations>[] = [
  {
    accessorKey: "apiEndpoint.name",
    header: "API端点",
    cell: ({ row }) => {
      const apiEndpoint = row.original.apiEndpoint;
      return (
        <div>
          <Link
            href={`/admin/api-endpoints/${apiEndpoint.id}/detail`}
            className="text-blue-600 hover:underline"
          >
            {apiEndpoint.name}
          </Link>
          <Badge variant="outline" className="ml-2">
            {apiEndpoint.type === "openaiLike" ? "OpenAI兼容" : "普通请求"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "cozeWebhook.url",
    header: "Webhook",
    cell: ({ row }) => {
      const webhook = row.original.cozeWebhook;
      return (
        <Link
          href={`/admin/webhooks/${webhook.id}`}
          className="text-blue-600 hover:underline"
        >
          {webhook.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "apiKey",
    header: "API密钥",
    cell: ({ row }) => {
      return (
        <code className="rounded bg-muted px-2 py-1 text-sm">
          {row.original.apiKey}
        </code>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "耗时",
    cell: ({ row }) => {
      const duration = row.original.duration;
      if (duration == null) {
        return <span className="text-muted-foreground">--ms</span>;
      }
      return (
        <span
          className={duration > 1000 ? "text-yellow-600" : "text-green-600"}
        >
          {duration}ms
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "调用时间",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const log = row.original;
      return (
        <Link href={`/admin/api-logs/${log.id}`}>
          <Button className="h-8 py-0" variant={"ghost"}>
            查看详情
            <Eye className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
