import AdminForm from "../_components/admin-form";

export default function NewAdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">新建管理员</h1>
      <AdminForm />
    </div>
  );
}
