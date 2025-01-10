import { ApiEndpointForm } from "../_components/form";
import { getWebhookOptions } from "../actions";

export default async function NewApiEndpointPage() {
  const webhookOptions = await getWebhookOptions();

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">新建API端点</h1>
      </div>
      <div className="rounded-md border p-4">
        <ApiEndpointForm webhookOptions={webhookOptions} />
      </div>
    </div>
  );
}
