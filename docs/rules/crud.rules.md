1. 创建完整的CRUD架构如下：

- 创建 /admin/{module}/page.tsx
  import { getAdmins } from "./actions";
  import { columns } from "./columns";
  import { Button } from "@/components/ui/button";
  import { Plus } from "lucide-react";
  import Link from "next/link";
  import PageTable from "@/components/page-table";

export default async function AdminsPage(props: PageProps) {
return (

<div className="container mx-auto py-10">
<div className="mb-6 flex items-center justify-between">
<h1 className="text-2xl font-bold">管理员管理</h1>
<Link href="/admins/new">
<Button>
<Plus className="mr-2 h-4 w-4" />
新建管理员
</Button>
</Link>
</div>
<PageTable
basePath="/admins"
load={(data) =>
getAdmins({
page: data.page,
pageSize: data.pageSize,
where: data.keyword
? {
OR: [
{ email: { contains: data.keyword } },
{ username: { contains: data.keyword } },
{ nickname: { contains: data.keyword } },
],
}
: {},
})
}
columns={columns}
searchParams={props.searchParams}
/>
</div>
);
}

- 创建 /admin/{module}/action.ts

  - 包含所有的CRUD操作
  - 使用 import { db } from "@/lib/db"; 导入prisma
  - 例如分页接口如下：
    // 获取管理员列表
    async function getAdmins(
    query: PageableQuery<typeof db.admin> = { page: 1, pageSize: 10 }
    ) {
    const skip = (query.page - 1) \* query.pageSize;
    const [total, data] = await Promise.all([
    db.admin.count({ where: query.where }),
    db.admin.findMany({
    skip,
    take: query.pageSize,
    orderBy: {
    createdAt: "desc",
    },
    where: query.where,
    }),
    ]);

    return {
    data,
    total,
    page: query.page,
    pageSize: query.pageSize,
    totalPages: Math.ceil(total / query.pageSize),
    };
    }

- 创建 /admin/{module}/columns.tsx

```typescript
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Menu } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit } from "lucide-react";
import { deleteMenu } from "./actions";
import Link from "next/link";
import { RemoveButton } from "@/components/remove-button";

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "name",
    header: "菜单名称",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "orderNum",
    header: "排序",
  },
  {
    accessorKey: "icon",
    header: "图标",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const menu = row.original;
      const handleDelete = async () => {
        if (!confirm("确定要删除这个菜单吗？")) return;
        await deleteMenu(menu.id);
        window.location.reload();
      };
      return (
        <div className="flex gap-2">
          <Link href={`/menus/${menu.id}`}>
            <Button className="h-8 py-0" variant={"ghost"}>
              编辑
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打开菜单</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <RemoveButton onDeleteAction={handleDelete} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
```

- 创建表单 /admin/{module}/\_components/form.tsx

```tsx
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
      router.push("/menus");
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
```

- 创建新建页面： /admin/{module}/new/page.tsx
- 创建编辑页面： /admin/{module}/{id}/page.tsx
- 创建详情页面： /admin/{module}/{id}/detail/page.tsx
