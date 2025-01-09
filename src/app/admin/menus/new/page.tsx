import { Metadata } from "next";
import { MenuForm } from "../_components/menu-form";

export const metadata: Metadata = {
  title: "新建菜单",
  description: "创建新的系统菜单",
};

export default function NewMenuPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">新建菜单</h1>
      <MenuForm />
    </div>
  );
}
