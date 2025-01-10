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
import { ApiEndpoint, CozeWebhook } from "@prisma/client";
import { createApiEndpoint, updateApiEndpoint } from "../actions";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const apiEndpointFormSchema = z.object({
  name: z.string().min(1, "名称不能为空"),
  type: z.enum(["openaiLike", "request"], {
    required_error: "请选择类型",
  }),
  description: z.string().optional(),
  cozeWebhookId: z.string().min(1, "请选择所属Webhook"),
});

type ApiEndpointFormValues = z.infer<typeof apiEndpointFormSchema>;

interface ApiEndpointFormProps {
  initialData?: ApiEndpoint & {
    cozeWebhook: CozeWebhook;
  };
  webhookOptions: {
    id: string;
    url: string;
    name: string;
  }[];
}

export function ApiEndpointForm({
  initialData,
  webhookOptions,
}: ApiEndpointFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ApiEndpointFormValues>({
    resolver: zodResolver(apiEndpointFormSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type as "openaiLike" | "request",
          description: initialData.description || "",
          cozeWebhookId: initialData.cozeWebhookId,
        }
      : {
          name: "",
          type: "request",
          description: "",
          cozeWebhookId: "",
        },
  });

  async function onSubmit(data: ApiEndpointFormValues) {
    try {
      if (initialData) {
        await updateApiEndpoint(initialData.id, data);
      } else {
        await createApiEndpoint(data);
      }
      router.push("/admin/api-endpoints");
      router.refresh();
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
                <Input placeholder="请输入API端点名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="openaiLike">OpenAI兼容</SelectItem>
                  <SelectItem value="request">普通请求</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入API端点描述"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cozeWebhookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>所属Webhook</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!!initialData}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择所属Webhook" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {webhookOptions.map((webhook) => (
                    <SelectItem key={webhook.id} value={webhook.id}>
                      {webhook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialData ? "更新" : "创建"}</Button>
      </form>
    </Form>
  );
}
