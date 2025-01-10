import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";
import { Metadata } from "next";
import { RoleService } from "@/service/role.service";
export const metadata: Metadata = {
  title: "角色管理",
  description: "管理系统角色和权限",
};
export default async function RolesPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">角色管理</h1>
        <Link href="/admin/roles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建角色
          </Button>
        </Link>
      </div>
      <PageTable
        basePath="/admin/roles"
        load={RoleService.getRoles}
        columns={columns}
        searchParams={props.searchParams}
      />
    </div>
  );
}
