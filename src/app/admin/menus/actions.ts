"use server";
import { MenuService } from "@/service/menu.service";
import { revalidatePath } from "next/cache";

export async function getMenus(
  ...args: Parameters<typeof MenuService.getMenus>
) {
  return MenuService.getMenus(...args);
}

export async function createMenu(data: {
  name: string;
  url: string;
  orderNum: number;
  parentId?: string | null;
  icon?: string | null;
  permissionIds?: string[];
}) {
  await MenuService.createMenu(
    data.name,
    data.url,
    data.orderNum,
    data.parentId,
    data.icon,
    data.permissionIds
  );
  revalidatePath("/admin/menus");
  return { success: true };
}

export async function updateMenu(
  menuId: string,
  data: {
    name?: string;
    url?: string;
    orderNum?: number;
    parentId?: string | null;
    icon?: string | null;
    permissionIds?: string[];
  }
) {
  await MenuService.updateMenu(menuId, data);
  revalidatePath("/admin/menus");
  return { success: true };
}

export async function deleteMenu(menuId: string) {
  await MenuService.deleteMenu(menuId);
  revalidatePath("/admin/menus");
  return { success: true };
}

export async function fetchMenus() {
  return MenuService.list();
}
