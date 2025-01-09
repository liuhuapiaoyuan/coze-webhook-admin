"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Menu } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit } from "lucide-react";
import { deleteMenu } from "./actions";
import Link from "next/link";
import { RemoveButton } from "./_components/remove-button";

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "name",
    header: "菜单名称",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "orderNum",
    header: "排序",
  },
  {
    accessorKey: "icon",
    header: "图标",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const menu = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个菜单吗？")) return;
        await deleteMenu(menu.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/menus/${menu.id}`}>
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
