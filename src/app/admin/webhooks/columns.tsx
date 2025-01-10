"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CozeWebhook } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit } from "lucide-react";
import { deleteWebhook } from "./actions";
import Link from "next/link";
import { RemoveButton } from "@/components/remove-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WebhookWithCount = CozeWebhook & {
  _count: {
    apiEndpoints: number;
    logs: number;
  };
};

export const columns: ColumnDef<WebhookWithCount>[] = [
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "url",
    header: "Webhook地址",
    cell: ({ row }) => {
      const url = row.original.url;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="max-w-[200px] truncate">
              {url}
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[400px] break-all">{url}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "authorization",
    header: "授权密钥",
  },
  {
    accessorKey: "_count.apiEndpoints",
    header: "API端点数",
  },
  {
    accessorKey: "_count.logs",
    header: "日志数",
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
      const webhook = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个Webhook吗？")) return;
        await deleteWebhook(webhook.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/admin/webhooks/${webhook.id}`}>
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
