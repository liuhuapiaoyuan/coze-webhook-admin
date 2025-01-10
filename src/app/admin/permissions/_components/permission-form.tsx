"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Permission } from "@prisma/client";
import { createPermission, updatePermission } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { PermissionFormValues, permissionResolver } from "./schema";
import { PermissionSelect } from "./permission-select";

interface PermissionFormProps {
  initialData?: Permission;
}

export function PermissionForm({ initialData }: PermissionFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<PermissionFormValues>({
    resolver: permissionResolver,
    mode: "onBlur",
    defaultValues: initialData || {
      name: "",
      key: "",
      description: "",
      parentId: null,
    },
  });

  async function onSubmit(data: PermissionFormValues) {
    try {
      if (initialData) {
        await updatePermission(initialData.id, data);
      } else {
        await createPermission(data);
      }
      router.push("/admin/permissions");
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
              <FormLabel>权限名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入权限名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>权限键</FormLabel>
              <FormControl>
                <Input placeholder="请输入权限键" {...field} />
              </FormControl>
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
                  placeholder="请输入权限描述"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>父权限</FormLabel>
              <FormControl>
                <PermissionSelect
                  onChange={field.onChange}
                  defaultValue={field.value!}
                  value={field.value!}
                />
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
