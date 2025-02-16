"use server";

import { db } from "@/lib/db";
import { ApiEndpointsService } from "@/service/api-endpoints.service";
import { revalidatePath } from "next/cache";

// 获取API端点列表
export async function getApiEndpoints(
  query: PageableQuery<typeof db.apiEndpoint> = { page: 1, pageSize: 10 }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.apiEndpoint.count({ where: query.where }),
    db.apiEndpoint.findMany({
      skip,
      take: query.pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: query.where,
      include: {
        cozeWebhook: true,
        _count: {
          select: {
            apiKeys: true,
            logs: true,
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

// 创建API端点
export async function createApiEndpoint(data: {
  cozeWebhookId: string;
  type: string;
  name: string;
  description?: string;
}) {
  const apiEndpoint = await db.apiEndpoint.create({
    data,
  });
  revalidatePath("/admin/api-endpoints");
  return apiEndpoint;
}

// 更新API端点
export async function updateApiEndpoint(
  id: string,
  data: {
    type: string;
    name: string;
    description?: string;
  }
) {
  const apiEndpoint = await db.apiEndpoint.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/api-endpoints");
  return apiEndpoint;
}

// 删除API端点
export async function deleteApiEndpoint(id: string) {
  await db.apiEndpoint.delete({
    where: { id },
  });
  revalidatePath("/admin/api-endpoints");
}

// 获取单个API端点
export async function getApiEndpoint(id: string) {
  return ApiEndpointsService.getApiendpoint(id);
}

// 获取所有Webhook选项
export async function getWebhookOptions() {
  return db.cozeWebhook.findMany({
    select: {
      id: true,
      url: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// 获取API端点密钥列表
export async function getEndpointKeys(
  endpointId: string,
  query: PageableQuery<typeof db.apiKey> = { page: 1, pageSize: 10 }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.apiKey.count({
      where: {
        apiEndpoints: {
          some: {
            id: endpointId,
          },
        },
        ...query.where,
      },
    }),
    db.apiKey.findMany({
      skip,
      take: query.pageSize,
      where: {
        apiEndpoints: {
          some: {
            id: endpointId,
          },
        },
        ...query.where,
      },
      orderBy: {
        createdAt: "desc",
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

// 获取API端点调用记录
export async function getEndpointRecords(
  endpointId: string,
  query: { page: number; pageSize: number }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.apiEndpointLog.count({
      where: { apiEndpointId: endpointId },
    }),
    db.apiEndpointLog.findMany({
      where: { apiEndpointId: endpointId },
      skip,
      take: query.pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    data,
    total,
  };
}
