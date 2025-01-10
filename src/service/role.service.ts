import { db } from "@/lib/db";

export class RoleService {
  /**
   * 获取角色列表
   */
  static async getRoles(
    { page, pageSize, where }: PageableQuery<typeof db.role> = {
      page: 1,
      pageSize: 10,
    }
  ) {
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      db.role.findMany({
        skip,
        take: pageSize,
        include: {
          admins: true,
          permissions: true,
        },
        orderBy: { createdAt: "desc" },
        where,
      }),
      db.role.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
    };
  }

  // getRoleById
  static async getRoleById(id: string) {
    return db.role.findUnique({ where: { id } });
  }

  /**
   * 创建角色
   */
  static async createRole(data: {
    name: string;
    code: string;
    description: string | null;
    permissions?: string[];
  }) {
    return db.role.create({
      data: {
        ...data,
        permissions: {
          connect: data.permissions?.map((permission) => ({ id: permission })),
        },
      },
    });
  }

  /**
   * 更新角色
   */
  static async updateRole(
    id: string,
    data: {
      name?: string;
      description: string | null;
      permissions?: string[];
    }
  ) {
    return db.role.update({
      where: { id },
      data: {
        ...data,
        permissions: data.permissions
          ? {
              connect: data.permissions.map((permission) => ({
                id: permission,
              })),
            }
          : undefined,
      },
    });
  }

  /**
   * 删除角色
   */
  static async deleteRole(id: string) {
    return db.role.delete({ where: { id } });
  }
}
