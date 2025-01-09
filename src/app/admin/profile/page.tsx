import { Metadata } from "next";
import { ProfileForm } from "./_components/form";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { AdminService } from "@/service/admin.service";

export const metadata: Metadata = {
  title: "个人信息",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    return notFound();
  }
  const admin = await AdminService.getAdmin(session.user.id);
  if (!admin) {
    return notFound();
  }
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">个人信息</h2>
      </div>
      <div className="grid gap-4">
        <ProfileForm user={admin} />
      </div>
    </div>
  );
}
