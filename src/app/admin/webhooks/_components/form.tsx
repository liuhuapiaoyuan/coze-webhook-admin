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
import { CozeWebhook } from "@prisma/client";
import { createWebhook, updateWebhook } from "../actions";
import { useToast } from "@/hooks/use-toast";

const webhookFormSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
  url: z.string().url("请输入有效的URL地址"),
  authorization: z.string().min(1, "授权密钥不能为空"),

  schema: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      type: z.string(),
    })
  ),
});
import { DynamicFormFields } from "@/components/shared/dynamic-form-fields";
type WebhookFormValues = z.infer<typeof webhookFormSchema>;

interface WebhookFormProps {
  initialData?: CozeWebhook;
}

export function WebhookForm({ initialData }: WebhookFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<WebhookFormValues>({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: initialData || {
      name: "",
      url: "",
      authorization: "",
    },
  });

  async function onSubmit(data: WebhookFormValues) {
    try {
      if (initialData) {
        await updateWebhook(initialData.id, data);
      } else {
        await createWebhook(data);
      }
      router.replace("/admin/webhooks");
      router.refresh();
      toast({
        title: "操作成功",
        description: "Webhook已创建",
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: error instanceof Error ? error.message : "操作失败",
        variant: "destructive",
      });
      console.error("提交失败:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入Webhook名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook地址</FormLabel>
              <FormControl>
                <Input placeholder="请输入Webhook地址" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>授权密钥</FormLabel>
              <FormControl>
                <Input placeholder="请输入授权密钥" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialData ? "更新" : "创建"}</Button>
      </form>
    </Form>
  );
}
