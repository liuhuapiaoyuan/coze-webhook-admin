"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 获取Webhook列表
export async function getWebhooks(
  query: PageableQuery<typeof db.cozeWebhook> = { page: 1, pageSize: 10 }
) {
  const skip = (query.page - 1) * query.pageSize;
  const [total, data] = await Promise.all([
    db.cozeWebhook.count({ where: query.where }),
    db.cozeWebhook.findMany({
      skip,
      take: query.pageSize,
      orderBy: {
        createdAt: "desc",
      },
      where: query.where,
      include: {
        _count: {
          select: {
            apiEndpoints: true,
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

// 创建Webhook
export async function createWebhook(data: {
  url: string;
  authorization: string;
}) {
  const webhook = await db.cozeWebhook.create({
    data,
  });
  revalidatePath("/webhooks");
  return webhook;
}

// 更新Webhook
export async function updateWebhook(
  id: string,
  data: {
    url: string;
    authorization: string;
  }
) {
  const webhook = await db.cozeWebhook.update({
    where: { id },
    data,
  });
  revalidatePath("/webhooks");
  return webhook;
}

// 删除Webhook
export async function deleteWebhook(id: string) {
  await db.cozeWebhook.delete({
    where: { id },
  });
  revalidatePath("/webhooks");
}

// 获取单个Webhook
export async function getWebhook(id: string) {
  return db.cozeWebhook.findUnique({
    where: { id },
  });
}
