"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

// 获取API密钥列表
export async function getApiKeys(
  query: PageableQuery<typeof db.apiKey> = { page: 1, pageSize: 10 }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.apiKey.count({ where: query.where }),
    db.apiKey.findMany({
      skip,
      take: query.pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: query.where,
      include: {
        apiEndpoints: {
          include: {
            cozeWebhook: true,
          },
        },
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

// 创建API密钥
export async function createApiKey(data: { apiEndpointIds: string[] }) {
  const apiKey = await db.apiKey.create({
    data: {
      key: `ak-${randomUUID()}`,
      apiEndpoints: {
        connect: data.apiEndpointIds.map((id) => ({ id })),
      },
    },
    include: {
      apiEndpoints: true,
    },
  });
  revalidatePath("/admin/api-keys");
  return apiKey;
}

// 更新API密钥
export async function updateApiKey(
  id: string,
  data: {
    apiEndpointIds: string[];
  }
) {
  const apiKey = await db.apiKey.update({
    where: { id },
    data: {
      apiEndpoints: {
        set: data.apiEndpointIds.map((id) => ({ id })),
      },
    },
    include: {
      apiEndpoints: true,
    },
  });
  revalidatePath("/admin/api-keys");
  return apiKey;
}

// 删除API密钥
export async function deleteApiKey(id: string) {
  await db.apiKey.delete({
    where: { id },
  });
  revalidatePath("/admin/api-keys");
}

// 获取单个API密钥
export async function getApiKey(id: string) {
  return db.apiKey.findUnique({
    where: { id },
    include: {
      apiEndpoints: {
        include: {
          cozeWebhook: true,
        },
      },
    },
  });
}

// 获取完整的API密钥
export async function getFullApiKey(id: string) {
  const apiKey = await db.apiKey.findUnique({
    where: { id },
    select: {
      key: true,
    },
  });

  if (!apiKey) {
    throw new Error("API密钥不存在");
  }

  return apiKey;
}

// 获取API端点选项
export async function getApiEndpointOptions() {
  return db.apiEndpoint.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      cozeWebhook: {
        select: {
          id: true,
          name: true,
          url: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
