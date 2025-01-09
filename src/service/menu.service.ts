import { db } from "@/lib/db";

export class MenuService {
  // 创建菜单
  static async createMenu(
    name: string,
    url: string,
    sort: number,
    parentId?: string | null,
    icon?: string | null,
    permissionIds?: string[]
  ) {
    return db.menu.create({
      data: {
        name,
        url,
        sort,
        parentId,
        icon,
        permissions: {
          connect: permissionIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  // getMenuById
  static async getMenuById(id: string) {
    return db.menu.findUnique({
      where: { id },
    });
  }

  // 获取单个菜单
  static async getMenu(menuId: string) {
    return db.menu.findUnique({
      where: { id: menuId },
      include: {
        permissions: true,
      },
    });
  }

  // list
  static async list() {
    return db.menu.findMany({
      orderBy: {
        sort: "asc",
      },
    });
  }

  // 获取菜单列表
  static async getMenus(
    query: PageableQuery<typeof db.menu> = { page: 1, pageSize: 10 }
  ) {
    const skip = (query.page - 1) * query.pageSize;
    const [total, data] = await Promise.all([
      db.menu.count({ where: query.where }),
      db.menu.findMany({
        skip,
        take: query.pageSize,
        orderBy: {
          sort: "asc",
        },
        where: query.where,
        include: {
          permissions: true,
        },
      }),
    ]);

    return {
      data,
      total,
      page: query.page,
      pageSize: query.pageSize,
      totalPages: Math.ceil(total / query.pageSize),
    };
  }

  // 更新菜单信息
  static async updateMenu(
    menuId: string,
    data: {
      name?: string;
      url?: string;
      sort?: number;
      parentId?: string | null;
      icon?: string | null;
      permissionIds?: string[];
    }
  ) {
    return db.menu.update({
      where: {
        id: menuId,
      },
      data: {
        ...data,
        permissions: {
          set: data.permissionIds?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  // 删除菜单
  static async deleteMenu(menuId: string) {
    return db.menu.delete({
      where: {
        id: menuId,
      },
    });
  }
}
