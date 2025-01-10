import { notFound } from "next/navigation";
import { ApiKeyForm } from "../_components/form";
import { getApiKey, getApiEndpointOptions } from "../actions";

interface EditApiKeyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditApiKeyPage({ params }: EditApiKeyPageProps) {
  const { id } = await params;
  const [apiKey, apiEndpointOptions] = await Promise.all([
    getApiKey(id),
    getApiEndpointOptions(),
  ]);

  if (!apiKey) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">编辑API密钥</h1>
      </div>
      <div className="rounded-md border p-4">
        <ApiKeyForm
          initialData={apiKey}
          apiEndpointOptions={apiEndpointOptions}
        />
      </div>
    </div>
  );
}
