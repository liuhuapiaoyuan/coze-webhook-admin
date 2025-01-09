import { ADMIN_ROLE } from "@/service/enum/ADMIN_ROLE";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
      nickname: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.nickname = token.nickname as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        if ("username" in user && typeof user.username === "string") {
          token.username = user.username;
        }
        if ("nickname" in user && typeof user.nickname === "string") {
          token.nickname = user.nickname;
        }
        if ("type" in user && typeof user.type === "string") {
          token.role = user.type;
        }
      }
      return token;
    },
  },
};
export const { auth } = NextAuth(authOptions);
