import { getMenus } from "./actions";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "菜单",
  description: "菜单管理",
};

export default async function MenuPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">菜单管理</h1>
        <Link href="/menus/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建菜单
          </Button>
        </Link>
      </div>
      <PageTable
        basePath="/menus"
        load={getMenus}
        columns={columns}
        searchParams={props.searchParams}
      />
    </div>
  );
}
