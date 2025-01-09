"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createAdmin, updateAdmin } from "../actions";
import { Admin } from "@prisma/client";
import { ADMIN_ROLE } from "@/service/enum/ADMIN_ROLE";

const formSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  username: z.string().min(2, { message: "用户名至少2个字符" }),
  password: z.string().min(6, { message: "密码至少6个字符" }).optional(),
  phone: z.string().optional(),
  nickname: z.string().optional(),
});

export default function AdminForm({ admin }: { admin?: Admin }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: admin?.email || "",
      username: admin?.username || "",
      nickname: admin?.nickname || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (admin) {
        await updateAdmin(admin.id, {
          ...values,
          role: values.role as ADMIN_ROLE,
        });
      } else {
        await createAdmin({
          ...values,
          password: values.password || "123456",
          role: values.role as ADMIN_ROLE,
        });
      }
      router.push("/admins");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "操作失败");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!admin && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>昵称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>电话</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{admin ? "更新" : "创建"}</Button>
      </form>
    </Form>
  );
}
