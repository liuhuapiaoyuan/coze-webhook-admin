"use server";
import { auth } from "@/lib/auth";
import { AdminService } from "@/service/admin.service";
import { revalidatePath } from "next/cache";

export async function updateProfile({ nickname }: { nickname: string }) {
  const session = await auth();
  if (!session?.user?.id) return;
  const adminId = session.user.id;
  await AdminService.changeNickname(adminId, nickname);
  revalidatePath("/profile");
  return { success: true };
}

export async function changePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) {
  const session = await auth();
  if (!session?.user?.id) return;
  const adminId = session.user.id;
  await AdminService.changePassword(adminId, oldPassword, newPassword);
  return { success: true };
}
