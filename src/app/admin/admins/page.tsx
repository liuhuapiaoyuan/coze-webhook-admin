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
        <Link href="admins/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建管理员
          </Button>
        </Link>
      </div>
      <PageTable
        basePath="/admin/admins"
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
