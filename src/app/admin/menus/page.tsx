import { getMenus } from "./actions";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "菜单",
  description: "菜单管理",
};

export default async function MenuPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">菜单管理</h1>
        <Link href="/admin/menus/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建菜单
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="system">
        <TabsList>
          <TabsTrigger value="system">系统菜单</TabsTrigger>
          <TabsTrigger value="custom">自定义菜单</TabsTrigger>
        </TabsList>
        <TabsContent value="system">
          <PageTable
            basePath="/admin/menus"
            load={(data) => getMenus({ ...data, type: "system" })}
            columns={columns}
            searchParams={props.searchParams}
          />
        </TabsContent>
        <TabsContent value="custom">
          <PageTable
            basePath="/admin/menus"
            load={(data) => getMenus({ ...data, type: "custom" })}
            columns={columns}
            searchParams={props.searchParams}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
