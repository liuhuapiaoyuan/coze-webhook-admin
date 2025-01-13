import { db } from "@/lib/db";
import { ApiKey } from "@prisma/client";
import Elysia from "elysia";

/** 认证数据 */
export type AuthData = {
  apiKey: ApiKey;
};

/**
 * 获取 Bearer Key
 */
function getBearerKey(request: {
  query: Record<string, string | undefined>;
  headers: Record<string, string | undefined>;
}): string | null {
  const authHeader =
    request.headers["Authorization"] || request.headers["authorization"];
  if (
    authHeader &&
    (authHeader.startsWith("Bearer ") || authHeader.startsWith("bearer "))
  ) {
    return authHeader.slice(7);
  }
  return request.query["access_token"] || null;
}

/**
 * 授权信息
 */
export function apiKey() {
  return new Elysia({ name: "Service.ApiKey" })
    .derive({ as: "scoped" }, async (request) => {
      const bearerKey = getBearerKey(request);
      if (!bearerKey) return { Auth: { apiKey: null } };

      const apiKey = await db.apiKey.findFirst({
        where: { key: bearerKey },
      });
      if (!apiKey) return { Auth: { apiKey: null } };

      return { Auth: { apiKey } };
    })
    .onBeforeHandle({ as: "scoped" }, ({ Auth, error }) => {
      if (!Auth?.apiKey) return error(401);
    });
}
