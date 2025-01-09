import { Metadata } from "next";
import { PermissionForm } from "../_components/permission-form";

export const metadata: Metadata = {
  title: "新建权限",
  description: "创建新的系统权限",
};

export default function NewPermissionPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">新建权限</h1>
      <PermissionForm />
    </div>
  );
}
