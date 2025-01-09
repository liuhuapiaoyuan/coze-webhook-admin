import { auth as nextjsAuth } from "@/lib/auth";
import Elysia from "elysia";
import type { Session } from "next-auth";

/** 认证数据 */
export type AuthData = {
  Auth: {
    /** 会话用户 */
    user: Session["user"];
  };
};

/**
 * 授权信息
 * @returns
 */
export function auth() {
  return new Elysia({ name: "Service.Auth" })
    .derive({ as: "scoped" }, async () => {
      const user = await nextjsAuth();
      return { Auth: { user: user?.user } };
    })
    .onBeforeHandle({ as: "scoped" }, ({ Auth, error }) => {
      if (!Auth?.user || !Auth.user) return error(401);
    });
}
