import { getApiEndpoints } from "./actions";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";

export default async function ApiEndpointsPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">API服务管理</h1>
        <Link href="/admin/api-endpoints/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建API端点
          </Button>
        </Link>
      </div>
      <PageTable
        basePath="/admin/api-endpoints"
        load={(data) =>
          getApiEndpoints({
            page: data.page,
            pageSize: data.pageSize,
            where: data.keyword
              ? {
                  OR: [
                    { name: { contains: data.keyword } },
                    { description: { contains: data.keyword } },
                    { type: { contains: data.keyword } },
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
