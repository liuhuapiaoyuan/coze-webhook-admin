import { Metadata } from "next";
import { PermissionForm } from "../_components/permission-form";
import { notFound } from "next/navigation";
import { PermissionService } from "@/service/permission.service";

export const metadata: Metadata = {
  title: "编辑权限",
  description: "编辑系统权限",
};

export default async function EditPermissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const permission = await PermissionService.getPermissionById(id);

  if (!permission) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">编辑权限</h1>
      <PermissionForm initialData={permission} />
    </div>
  );
}
