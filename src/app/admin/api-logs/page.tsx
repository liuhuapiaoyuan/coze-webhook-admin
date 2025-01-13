import { getApiLogs } from "./actions";
import { columns } from "./columns";
import PageTable from "@/components/page-table";

export default async function ApiLogsPage(props: PageProps) {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">API调用日志</h1>
      </div>
      <PageTable
        basePath="/admin/api-logs"
        load={(data) =>
          getApiLogs({
            page: data.page,
            pageSize: data.pageSize,
            where: data.keyword
              ? {
                  OR: [
                    { apiKey: { contains: data.keyword } },
                    { requestParams: { contains: data.keyword } },
                    { response: { contains: data.keyword } },
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
