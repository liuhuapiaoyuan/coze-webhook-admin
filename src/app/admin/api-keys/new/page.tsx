import { ApiKeyForm } from "../_components/form";
import { getApiEndpointOptions } from "../actions";

export default async function NewApiKeyPage() {
  const apiEndpointOptions = await getApiEndpointOptions();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">新建API密钥</h1>
      </div>
      <div className="rounded-md border p-4">
        <ApiKeyForm apiEndpointOptions={apiEndpointOptions} />
      </div>
    </div>
  );
}
