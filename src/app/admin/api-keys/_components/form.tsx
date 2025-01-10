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
import { useRouter } from "next/navigation";
import { ApiKey, ApiEndpoint } from "@prisma/client";
import { createApiKey, updateApiKey } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const apiKeyFormSchema = z.object({
  apiEndpointIds: z.array(z.string()).min(1, "请至少选择一个API端点"),
});

type ApiKeyFormValues = z.infer<typeof apiKeyFormSchema>;

interface ApiEndpointOption {
  id: string;
  name: string;
  type: string;
  cozeWebhook: {
    url: string;
    name: string;
  };
}

interface ApiKeyFormProps {
  initialData?: ApiKey & {
    apiEndpoints: ApiEndpoint[];
  };
  apiEndpointOptions: ApiEndpointOption[];
}

export function ApiKeyForm({
  initialData,
  apiEndpointOptions,
}: ApiKeyFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      apiEndpointIds:
        initialData?.apiEndpoints.map((endpoint) => endpoint.id) || [],
    },
  });

  async function onSubmit(data: ApiKeyFormValues) {
    try {
      if (initialData) {
        await updateApiKey(initialData.id, data);
      } else {
        await createApiKey(data);
      }
      router.push("/admin/api-keys");
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
          name="apiEndpointIds"
          render={() => (
            <FormItem>
              <FormLabel>选择API端点</FormLabel>
              <ScrollArea className="h-72 rounded-md border">
                <div className="space-y-4 p-4">
                  {apiEndpointOptions.map((endpoint) => (
                    <FormField
                      key={endpoint.id}
                      control={form.control}
                      name="apiEndpointIds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={endpoint.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(endpoint.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        endpoint.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== endpoint.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-normal">
                                {endpoint.name}
                                <span className="ml-2 text-gray-500">
                                  (
                                  {endpoint.type === "openaiLike"
                                    ? "OpenAI兼容"
                                    : "普通请求"}
                                  )
                                </span>
                              </FormLabel>
                              <p className="text-xs text-gray-500">
                                Webhook: {endpoint.cozeWebhook.name}
                              </p>
                            </div>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialData ? "更新" : "创建"}</Button>
      </form>
    </Form>
  );
}
