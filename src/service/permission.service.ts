import { db } from "@/lib/db";

export class PermissionService {
  // 创建权限
  static async createPermission(
    name: string,
    key: string,
    description?: string | null,
    parentId?: string | null
  ) {
    const exists = await db.permission.findUnique({
      where: { key },
    });

    if (exists) {
      throw new Error("权限已存在");
    }

    return db.permission.create({
      data: {
        name,
        key,
        description,
        parentId,
      },
    });
  }

  // getPermissionById
  static async getPermissionById(id: string) {
    return db.permission.findUnique({
      where: { id },
    });
  }

  // 获取单个权限
  static async getPermission(permissionId: string) {
    const permission = await db.permission.findUnique({
      where: { id: permissionId },
      include: {
        children: true,
      },
    });
    return permission;
  }

  // list
  static async list() {
    return db.permission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // 获取权限列表
  static async getPermissions(
    query: PageableQuery<typeof db.permission> = { page: 1, pageSize: 10 }
  ) {
    const skip = (query.page - 1) * query.pageSize;
    const [total, data] = await Promise.all([
      db.permission.count({ where: query.where }),
      db.permission.findMany({
        skip,
        take: query.pageSize,
        orderBy: {
          createdAt: "desc",
        },
        where: query.where,
        include: {
          children: true,
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

  // 更新权限信息
  static async updatePermission(
    permissionId: string,
    data: {
      name?: string;
      key?: string;
      description?: string | null;
      parentId?: string | null;
    }
  ) {
    const exists = await db.permission.findUnique({
      where: { key: data.key },
    });
    if (exists && exists.id !== permissionId) {
      throw new Error("权限已存在");
    }

    return db.permission.update({
      where: {
        id: permissionId,
      },
      data,
    });
  }

  // 删除权限
  static async deletePermission(permissionId: string) {
    return db.permission.delete({
      where: {
        id: permissionId,
      },
    });
  }
}
