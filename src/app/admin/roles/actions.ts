"use server";

import { RoleService } from "@/service/role.service";
import { revalidatePath } from "next/cache";

export async function getRoles(
  ...args: Parameters<typeof RoleService.getRoles>
) {
  return RoleService.getRoles(...args);
}

export async function createRole(data: { name: string; description?: string }) {
  try {
    await RoleService.createRole(data);
    revalidatePath("/roles");
    return { success: true };
  } catch (_error) {
    throw new Error("创建角色失败");
  }
}

export async function updateRole(
  roleId: string,
  data: {
    name?: string;
    description?: string;
  }
) {
  try {
    await RoleService.updateRole(roleId, data);
    revalidatePath("/roles");
    return { success: true };
  } catch (_error) {
    throw new Error("更新角色失败");
  }
}

export async function deleteRole(roleId: string) {
  try {
    await RoleService.deleteRole(roleId);
    revalidatePath("/roles");
    return { success: true };
  } catch (_error) {
    throw new Error("删除角色失败");
  }
}
