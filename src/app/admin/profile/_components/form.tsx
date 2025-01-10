"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon } from "lucide-react";
import { changePassword, updateProfile } from "../actions";
import type { Admin } from "@prisma/client";
import { ADMIN_ROLE, ADMIN_ROLE_NAME } from "@/service/enum/ADMIN_ROLE";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const nicknameFormSchema = z.object({
  nickname: z.string().min(2, {
    message: "昵称至少需要2个字符",
  }),
});

const passwordFormSchema = z.object({
  oldPassword: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
  newPassword: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
});

export function ProfileForm(props: { user: Admin }) {
  const { user } = props;
  const { toast } = useToast();
  const [isEditNickname, setIsEditNickname] = useState(false);

  const nicknameForm = useForm<z.infer<typeof nicknameFormSchema>>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: {
      nickname: user?.nickname || "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (user?.nickname) {
      nicknameForm.setValue("nickname", user.nickname);
    }
  }, [nicknameForm, user.nickname]);

  async function onSubmitNickname(values: z.infer<typeof nicknameFormSchema>) {
    try {
      const result = await updateProfile({ nickname: values.nickname });
      if (!result?.success) {
        toast({
          variant: "destructive",
          title: "修改失败",
          description: "请稍后重试",
        });
      }
      toast({
        title: "修改成功",
        description: "昵称已更新",
      });
      setIsEditNickname(false);
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "修改失败",
        description: "请稍后重试",
      });
    }
  }

  async function onSubmitPassword(values: z.infer<typeof passwordFormSchema>) {
    try {
      const result = await changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      if (!result?.success) {
        throw new Error();
      }
      toast({
        title: "修改成功",
        description: "密码已更新",
      });
      passwordForm.reset();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "修改失败",
        description: "请检查原密码是否正确",
      });
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent>
          <CardHeader className="hidden"></CardHeader>
          <div className="flex items-center space-x-4 pt-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback>{user?.nickname?.[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-2xl font-semibold">{user?.nickname}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditNickname(true)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                角色: {ADMIN_ROLE_NAME[user.type as ADMIN_ROLE]}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="">
          <CardHeader>
            <CardTitle>修改密码</CardTitle>
          </CardHeader>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>原密码</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>新密码</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">修改密码</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isEditNickname} onOpenChange={setIsEditNickname}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改昵称</DialogTitle>
          </DialogHeader>
          <Form {...nicknameForm}>
            <form
              onSubmit={nicknameForm.handleSubmit(onSubmitNickname)}
              className="space-y-4"
            >
              <FormField
                control={nicknameForm.control}
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

              <Button type="submit">保存</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
