import { getWebhooks } from "./actions";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageTable from "@/components/page-table";

export default async function WebhooksPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Webhook管理</h1>
        <Link href="/admin/webhooks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建Webhook
          </Button>
        </Link>
      </div>
      <PageTable
        basePath="/admin/webhooks"
        load={(data) =>
          getWebhooks({
            page: data.page,
            pageSize: data.pageSize,
            where: data.keyword
              ? {
                  OR: [
                    { name: { contains: data.keyword } },
                    { url: { contains: data.keyword } },
                    { authorization: { contains: data.keyword } },
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
