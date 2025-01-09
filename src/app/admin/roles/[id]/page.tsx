import { Metadata } from "next";
import { RoleForm } from "../_components/role-form";
import { notFound } from "next/navigation";
import { RoleService } from "@/service/role.service";

export const metadata: Metadata = {
  title: "编辑角色",
  description: "编辑系统角色",
};

export default async function EditRolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await RoleService.getRoleById(id);

  if (!role) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">编辑角色</h1>
      <RoleForm initialData={role} />
    </div>
  );
}
