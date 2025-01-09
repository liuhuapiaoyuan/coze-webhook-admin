"use server";

import { PermissionService } from "@/service/permission.service";
import { revalidatePath } from "next/cache";

export async function getPermissions(
  ...args: Parameters<typeof PermissionService.getPermissions>
) {
  return PermissionService.getPermissions(...args);
}

export async function createPermission(data: {
  name: string;
  key: string;
  description?: string | null;
}) {
  await PermissionService.createPermission(
    data.name,
    data.key,
    data.description
  );
  revalidatePath("/permissions");
  return { success: true };
}

export async function updatePermission(
  permissionId: string,
  data: {
    name?: string;
    description?: string | null;
    key?: string;
  }
) {
  await PermissionService.updatePermission(permissionId, data);
  revalidatePath("/permissions");
  return { success: true };
}

export async function deletePermission(permissionId: string) {
  await PermissionService.deletePermission(permissionId);
  revalidatePath("/permissions");
  return { success: true };
}

// fetchPermissions
export async function fetchPermissions() {
  return PermissionService.list();
}
