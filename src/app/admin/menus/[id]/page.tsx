import { Metadata } from "next";
import { MenuForm } from "../_components/menu-form";
import { notFound } from "next/navigation";
import { MenuService } from "@/service/menu.service";

export const metadata: Metadata = {
  title: "编辑菜单",
  description: "编辑系统菜单",
};

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const menu = await MenuService.getMenuById(id);

  if (!menu) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 text-2xl font-bold">编辑菜单</h1>
      <MenuForm initialData={menu} />
    </div>
  );
}
