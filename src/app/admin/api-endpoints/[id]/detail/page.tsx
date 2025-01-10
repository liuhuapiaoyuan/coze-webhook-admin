import { notFound } from "next/navigation";
import { getApiEndpoint } from "../../actions";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { BasicInfo } from "../../_components/basic-info";
import { DetailTabs } from "../../_components/detail-tabs";

interface ApiEndpointDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApiEndpointDetailPage({
  params,
}: ApiEndpointDetailPageProps) {
  const { id } = await params;
  const apiEndpoint = await getApiEndpoint(id);

  if (!apiEndpoint) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">API端点详情</h1>
        <Link href={`/admin/api-endpoints/${id}`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* 左侧详情信息 */}
        <div className="col-span-2">
          <BasicInfo apiEndpoint={apiEndpoint} />
        </div>

        {/* 右侧标签页 */}
        <div className="col-span-3">
          <DetailTabs apiEndpoint={apiEndpoint} />
        </div>
      </div>
    </div>
  );
}
