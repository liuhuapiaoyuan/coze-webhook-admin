import { db } from "@/lib/db";
import { compare, hash } from "bcrypt";
import { ADMIN_ROLE } from "./enum/ADMIN_ROLE";
import { Admin } from "@prisma/client";

export class AdminService {
  // 创建管理员
  static async createAdmin(
    email: string,
    username: string,
    password: string,
    data?: {
      nickname?: string;
      phone?: string;
      type?: ADMIN_ROLE;
    }
  ) {
    const exists = await db.admin.findUnique({
      where: { email },
    });

    if (exists) {
      throw new Error("邮箱已被注册");
    }

    const hashedPassword = await hash(password, 10);

    return db.admin.create({
      data: {
        email,
        username,
        password: hashedPassword,
        ...data,
      },
    });
  }

  // 获得管理员
  static async getAdmin(adminId: string) {
    return db.admin.findUnique({
      where: { id: adminId },
    });
  }

  // 获取管理员列表
  static async getAdmins(
    query: PageableQuery<typeof db.admin> = { page: 1, pageSize: 10 }
  ) {
    const skip = (query.page - 1) * query.pageSize;
    const [total, data] = await Promise.all([
      db.admin.count({ where: query.where }),
      db.admin.findMany({
        skip,
        take: query.pageSize,
        orderBy: {
          createdAt: "desc",
        },
        where: query.where,
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

  // 更新管理员信息
  static async updateAdmin(
    adminId: string,
    data: {
      email?: string;
      password?: string;
      nickname?: string;
      phone?: string;
      role?: ADMIN_ROLE;
    }
  ) {
    const { password, ...rest } = data;
    const updateData: Partial<Admin> = { ...rest };

    if (password) {
      updateData.password = await hash(password, 10);
    }

    return db.admin.update({
      where: {
        id: adminId,
      },
      data: updateData,
    });
  }

  // 删除管理员
  static async deleteAdmin(adminId: string) {
    return db.admin.delete({
      where: {
        id: adminId,
      },
    });
  }
  /**
   *
   * @param account 登录账号或者邮箱
   * @param password
   * @returns
   */
  static async login(account: string, password: string) {
    const admin = await db.admin.findFirst({
      where: {
        OR: [{ email: account }, { username: account }],
      },
    });
    if (!admin) {
      throw new Error("账号或者密码错误");
    }

    const isValid = await compare(password, admin.password);

    if (!isValid) {
      throw new Error("账号或者密码错误");
    }

    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      nickname: admin.nickname,
      name: admin.nickname,
      phone: admin.phone,
      type: admin.type,
    };
  }

  // 修改密码
  static async changePassword(
    adminId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const admin = await db.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new Error("管理员不存在");
    }

    const isValid = await compare(oldPassword, admin.password);

    if (!isValid) {
      throw new Error("原密码错误");
    }

    const hashedPassword = await hash(newPassword, 10);

    return db.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });
  }

  // 修改昵称
  static async changeNickname(adminId: string, newNickname: string) {
    const admin = await db.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new Error("管理员不存在");
    }

    return db.admin.update({
      where: { id: adminId },
      data: { nickname: newNickname },
    });
  }

  static async createDefaultAdmin() {
    const exists = await db.admin.findUnique({
      where: { email: "admin@admin.com" },
    });
    if (exists) return;
    await db.admin.create({
      data: {
        email: "admin@admin.com",
        username: "admin",
        nickname: "admin",
        phone: "admin",
        type: ADMIN_ROLE.SUPERADMIN,
        password: await hash("admin", 10),
      },
    });
    console.log("默认管理员已创建,账号：admin@admin.com，密码：admin");
  }
}
