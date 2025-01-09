import { AdminService } from "@/service/admin.service";
import AdminForm from "../_components/admin-form";
import { notFound } from "next/navigation";

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = await AdminService.getAdmin(id);
  if (!admin) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">编辑管理员</h1>
      <AdminForm admin={admin} />
    </div>
  );
}
