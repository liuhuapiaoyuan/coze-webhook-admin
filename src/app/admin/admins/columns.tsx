"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Admin } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Key, Edit, Trash } from "lucide-react";
import { resetPassword, deleteAdmin } from "./actions";
import Link from "next/link";
import { format } from "date-fns";
import { ADMIN_ROLE, ADMIN_ROLE_NAME } from "@/service/enum/ADMIN_ROLE";
import { useToast } from "@/hooks/use-toast";

const AdminActions = ({ admin }: { admin: Admin }) => {
  const { toast } = useToast();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">打开菜单</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={async () => {
            if (confirm("确定要重置密码吗？")) {
              await resetPassword(admin.id);
              alert("密码已重置");
            }
          }}
        >
          <Key className="mr-2 h-4 w-4" />
          重置密码
        </DropdownMenuItem>
        <Link href={`admins/${admin.id}`}>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            编辑信息
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={async () => {
            if (confirm("确定要删除该管理员吗？")) {
              try {
                await deleteAdmin(admin.id);
                toast({ description: "管理员已删除" });
              } catch (error) {
                toast({
                  description:
                    error instanceof Error ? error.message : "删除管理员失败",
                  variant: "destructive",
                });
              }
            }
          }}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          删除管理员
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "avatar",
    header: "头像",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <Avatar>
          <AvatarImage src={admin.avatar || ""} alt={admin.email || ""} />
          <AvatarFallback>{admin.email?.[0] || admin.email[0]}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "email",
    header: "邮箱",
  },
  {
    accessorKey: "username",
    header: "用户名",
  },
  {
    accessorKey: "nickname",
    header: "昵称",
  },
  {
    accessorKey: "phone",
    header: "电话",
  },
  {
    accessorKey: "role",
    header: "角色",
    cell: ({ row }) => {
      const admin = row.original;
      return ADMIN_ROLE_NAME[admin.type as ADMIN_ROLE];
    },
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm:ss");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AdminActions admin={row.original} />,
  },
];
