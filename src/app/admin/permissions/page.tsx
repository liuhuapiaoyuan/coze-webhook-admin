import { columns } from "./columns";
import PageTable from "@/components/page-table";
import { Metadata } from "next";
import { PermissionService } from "@/service/permission.service";
import { PermissionsDrawer } from "./new/drawer";

export const metadata: Metadata = {
  title: "权限管理",
  description: "管理系统权限",
};
export default async function PermissionPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">权限管理</h1>
        <PermissionsDrawer />
      </div>
      <PageTable
        basePath="/permissions"
        load={PermissionService.getPermissions}
        columns={columns}
        searchParams={props.searchParams}
      />
    </div>
  );
}
