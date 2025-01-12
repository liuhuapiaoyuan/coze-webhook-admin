import { getMenus, getSystemMenu } from "./actions";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createLoader, parseAsString } from "nuqs/server";
import { redirect } from "next/navigation";
import { systemColumns } from "./system_columns";

export const metadata: Metadata = {
  title: "菜单",
  description: "菜单管理",
};
const loadSearchParams = createLoader({
  type: parseAsString.withDefault("system"),
});
export default async function MenuPage(props: PageProps) {
  const params = await loadSearchParams(props.searchParams);
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
      <Tabs
        defaultValue={params.type}
        value={params.type}
        onValueChange={async (value) => {
          "use server";
          redirect(`/admin/menus?type=${value}`);
        }}
      >
        <TabsList>
          <TabsTrigger value="system">系统菜单</TabsTrigger>
          <TabsTrigger value="custom">自定义菜单</TabsTrigger>
        </TabsList>
        <TabsContent value="system">
          <PageTable
            basePath="/admin/menus"
            load={getSystemMenu}
            columns={systemColumns}
            searchParams={props.searchParams}
          />
        </TabsContent>
        <TabsContent value="custom">
          <PageTable
            basePath="/admin/menus"
            load={(data) =>
              getMenus({
                ...data,
                where: {
                  name: data.keyword ? { contains: data.keyword } : {},
                },
              })
            }
            columns={columns}
            searchParams={props.searchParams}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
