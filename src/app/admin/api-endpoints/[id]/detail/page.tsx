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
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">API端点详情</h1>
        <Link href={`/admin/api-endpoints/${id}`}>
          <Button className="w-full sm:w-auto">
            <Edit className="mr-2 h-4 w-4" />
            编辑
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <BasicInfo apiEndpoint={apiEndpoint} />
        </div>

        <div className="lg:col-span-3">
          <DetailTabs apiEndpoint={apiEndpoint} />
        </div>
      </div>
    </div>
  );
}
