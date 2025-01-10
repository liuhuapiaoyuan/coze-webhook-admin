"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ApiKey, ApiEndpoint, CozeWebhook } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Copy } from "lucide-react";
import { deleteApiKey } from "./actions";
import Link from "next/link";
import { RemoveButton } from "@/components/remove-button";
import { useToast } from "@/hooks/use-toast";
import { getApiKey } from "./actions";

type ApiKeyWithRelations = ApiKey & {
  apiEndpoints: (ApiEndpoint & {
    cozeWebhook: CozeWebhook;
  })[];
};

const CopyButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const copyKey = async () => {
    try {
      const fullKey = await getApiKey(id);
      if (fullKey == null) {
        throw new Error("API密钥不存在");
      }
      await navigator.clipboard.writeText(fullKey?.key);
      toast({
        title: "复制成功",
        description: "API密钥已复制到剪贴板",
      });
    } catch (error) {
      toast({
        title: "复制失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyKey}>
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<ApiKeyWithRelations>[] = [
  {
    accessorKey: "key",
    header: "API密钥",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            ak-{"*".repeat(30)}
          </code>
          <CopyButton id={row.original.id} />
        </div>
      );
    },
  },
  {
    accessorKey: "apiEndpoints",
    header: "关联的API端点",
    cell: ({ row }) => {
      const apiEndpoints = row.original.apiEndpoints;
      return (
        <div className="space-y-1">
          {apiEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="text-sm">
              <Link
                href={`api-endpoints/${endpoint.id}`}
                className="text-blue-600 hover:underline"
              >
                {endpoint.name}
              </Link>
              <span className="text-gray-500">
                {" "}
                ({endpoint.type === "openaiLike" ? "OpenAI兼容" : "普通请求"})
              </span>
              <div className="text-xs text-gray-500">
                Webhook: {endpoint.cozeWebhook.name}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const apiKey = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个API密钥吗？")) return;
        await deleteApiKey(apiKey.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/admin/api-keys/${apiKey.id}`}>
            <Button className="h-8 py-0" variant={"ghost"}>
              编辑
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打开菜单</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <RemoveButton onDeleteAction={handleDelete} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
