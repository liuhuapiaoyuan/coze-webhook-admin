import { Metadata } from "next";
import { RoleForm } from "../_components/role-form";

export const metadata: Metadata = {
  title: "新建角色",
  description: "创建新的系统角色",
};

export default function NewRolePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">新建角色</h1>
      <RoleForm />
    </div>
  );
}
