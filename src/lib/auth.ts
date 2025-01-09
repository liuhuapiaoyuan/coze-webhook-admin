import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth.base";
import NextAuth, { NextAuthConfig } from "next-auth";
import { AdminService } from "@/service/admin.service";
export const providers: NextAuthConfig["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "账号", type: "email" },
      password: { label: "密码", type: "password" },
    },
    async authorize(credentials) {
      try {
        const user = await AdminService.login(
          credentials.email as string,
          credentials.password as string
        );
        return user;
      } catch (_error) {
        return null;
      }
    },
  }),
];
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authOptions,
  providers: [...authOptions.providers, ...providers],
});
