"use server";
import { APP_MENUS } from "@/const/APP_MENUS";
import { MenuService } from "@/service/menu.service";
import { revalidatePath } from "next/cache";
import { search } from "text-search-engine";

export async function getMenus(
  ...args: Parameters<typeof MenuService.getMenus>
) {
  return MenuService.getMenus(...args);
}

/**
 * 系统菜单
 * @param param0
 * @returns
 */
export async function getSystemMenu({
  page,
  pageSize,
  keyword,
}: {
  page: number;
  pageSize: number;
  keyword: string | null;
}) {
  const menus =
    keyword && keyword.length > 0
      ? APP_MENUS.filter(
          (menu) => (search(menu.name, keyword)?.length ?? 0) > 0
        )
      : APP_MENUS;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedMenus = menus.slice(startIndex, endIndex);
  return {
    data: paginatedMenus,
    total: menus.length,
    page,
    pageSize,
    totalPages: Math.ceil(menus.length / pageSize),
  };
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
