"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ApiEndpoint } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit } from "lucide-react";
import { deleteApiEndpoint } from "./actions";
import Link from "next/link";
import { RemoveButton } from "@/components/remove-button";

type ApiEndpointWithWebhook = ApiEndpoint & {
  cozeWebhook: {
    name: string;
    url: string;
  };
};

export const columns: ColumnDef<ApiEndpointWithWebhook>[] = [
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "path",
    header: "路径",
  },
  {
    accessorKey: "type",
    header: "类型",
    cell: ({ row }) => {
      const type = row.original.type;
      return type === "openaiLike" ? "OpenAI兼容" : "普通请求";
    },
  },
  {
    accessorKey: "cozeWebhook",
    header: "所属Webhook",
    cell: ({ row }) => {
      const webhook = row.original.cozeWebhook;
      return webhook.name;
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
      const apiEndpoint = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个API端点吗？")) return;
        await deleteApiEndpoint(apiEndpoint.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/admin/api-endpoints/${apiEndpoint.id}`}>
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
