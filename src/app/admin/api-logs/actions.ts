"use server";

import { db } from "@/lib/db";

// 获取API日志列表
export async function getApiLogs(
  query: PageableQuery<typeof db.apiEndpointLog> = { page: 1, pageSize: 10 }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.apiEndpointLog.count({ where: query.where }),
    db.apiEndpointLog.findMany({
      skip,
      take: query.pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: query.where,
      include: {
        apiEndpoint: true,
        cozeWebhook: true,
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

// 获取单个API日志详情
export async function getApiLog(id: string) {
  return db.apiEndpointLog.findUnique({
    where: { id },
    include: {
      apiEndpoint: true,
      cozeWebhook: true,
    },
  });
}
