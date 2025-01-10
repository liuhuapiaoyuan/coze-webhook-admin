"use server";

import { AdminService } from "@/service/admin.service";
import { ADMIN_ROLE } from "@/service/enum/ADMIN_ROLE";
import { revalidatePath } from "next/cache";

export async function getAdmins(
  ...args: Parameters<typeof AdminService.getAdmins>
) {
  return AdminService.getAdmins(...args);
}

export async function resetPassword(adminId: string) {
  // 这里需要在 AdminService 中实现重置密码的方法
  await AdminService.updateAdmin(adminId, { password: "admin" });
  revalidatePath("/admins");
  return { success: true };
}

export async function deleteAdmin(adminId: string) {
  await AdminService.deleteAdmin(adminId);
  revalidatePath("/admins");
  return { success: true };
}

export async function createAdmin(data: {
  email: string;
  password: string;
  username: string;
  nickname?: string;
  phone?: string;
  type?: ADMIN_ROLE;
}) {
  await AdminService.createAdmin(data.email, data.username, data.password, {
    nickname: data.nickname,
    type: data.type,
    phone: data.phone,
  });
  revalidatePath("/admins");
  return { success: true };
}

export async function updateAdmin(
  adminId: string,
  data: {
    email?: string;
    password?: string;
    username?: string;
    nickname?: string;
    phone?: string;
    type?: ADMIN_ROLE;
  }
) {
  await AdminService.updateAdmin(adminId, data);
  revalidatePath("/admins");
  return { success: true };
}
