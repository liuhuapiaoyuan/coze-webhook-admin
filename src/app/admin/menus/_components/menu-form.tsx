"use client";
import React, { useState, useEffect } from "react";
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
import { Menu } from "@prisma/client";
import { createMenu, updateMenu, fetchMenus } from "../actions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const menuFormSchema = z.object({
  name: z.string().min(1, "菜单名称不能为空"),
  url: z.string().min(1, "URL不能为空"),
  orderNum: z.number().min(0, "排序号必须大于等于0"),
  parentId: z.string().nullable(),
  icon: z.string().optional().nullable(),
});

type MenuFormValues = z.infer<typeof menuFormSchema>;

interface MenuFormProps {
  initialData?: Menu;
}

export function MenuForm({ initialData }: MenuFormProps) {
  const router = useRouter();
  const [menus, setMenus] = useState<Menu[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadMenus = async () => {
      const data = await fetchMenus();
      setMenus(data);
    };
    loadMenus();
  }, []);

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: initialData || {
      name: "",
      url: "",
      orderNum: 0,
      parentId: null,
      icon: "",
    },
  });

  async function onSubmit(data: MenuFormValues) {
    try {
      if (initialData) {
        await updateMenu(initialData.id, data);
      } else {
        await createMenu(data);
      }
      router.push("/admin/menus");
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
              <FormLabel>菜单名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入菜单名称" {...field} />
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
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="请输入URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderNum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>排序号</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="请输入排序号"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
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
              <FormLabel>父菜单</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value!}
                  value={field.value!}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择父菜单" />
                  </SelectTrigger>
                  <SelectContent>
                    {menus.map((menu) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>图标</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入图标"
                  {...field}
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
