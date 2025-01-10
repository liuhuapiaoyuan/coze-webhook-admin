import { notFound } from "next/navigation";
import { ApiEndpointForm } from "../_components/form";
import { getApiEndpoint, getWebhookOptions } from "../actions";

interface EditApiEndpointPageProps {
  params: {
    id: string;
  };
}

export default async function EditApiEndpointPage({
  params,
}: EditApiEndpointPageProps) {
  const [apiEndpoint, webhookOptions] = await Promise.all([
    getApiEndpoint(params.id),
    getWebhookOptions(),
  ]);

  if (!apiEndpoint) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">编辑API端点</h1>
      </div>
      <div className="rounded-md border p-4">
        <ApiEndpointForm
          initialData={apiEndpoint}
          webhookOptions={webhookOptions}
        />
      </div>
    </div>
  );
}
