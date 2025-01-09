"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Role } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit } from "lucide-react";
import { deleteRole } from "./actions";
import Link from "next/link";
import { RemoveButton } from "./_components/remove-button";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "角色名称",
  },
  {
    accessorKey: "description",
    header: "描述",
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
      const role = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个角色吗？")) return;
        await deleteRole(role.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/roles/${role.id}`}>
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
