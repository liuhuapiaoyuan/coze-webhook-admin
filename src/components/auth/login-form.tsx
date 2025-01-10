"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Record<string, string>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    setIsLoading(false);
    if (result?.error) {
      toast({
        title: "登录失败",
        description: "邮箱或密码错误",
        variant: "destructive",
      });
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">管理员登陆</CardTitle>
          <CardDescription>
            输入您的邮箱以登录您的账户(默认账号: admin@admin.com/admin)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div>
                <div className="grid gap-2">
                  <Label htmlFor="email">管理员账号/邮箱</Label>
                  <Input
                    id="email"
                    placeholder="admin@admin.com"
                    required
                    {...form.register("email")}
                    disabled={isLoading}
                  />
                </div>
                {form.formState.errors.email?.message && (
                  <div className="text-sm text-red-500">
                    {form.formState.errors.email?.message}
                  </div>
                )}
              </div>
              <div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">密码</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      忘记密码？
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...form.register("password")}
                    disabled={isLoading}
                  />
                </div>
                {form.formState.errors.password?.message && (
                  <div className="text-sm text-red-500">
                    {form.formState.errors.password?.message}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "登录中..." : "登录"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              还没有账户？{" "}
              <a href="#" className="underline underline-offset-4">
                注册
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
