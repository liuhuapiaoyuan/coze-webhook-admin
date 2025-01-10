import { notFound } from "next/navigation";
import { WebhookForm } from "../_components/form";
import { getWebhook } from "../actions";

interface EditWebhookPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWebhookPage({
  params,
}: EditWebhookPageProps) {
  const { id } = await params;
  const webhook = await getWebhook(id);

  if (!webhook) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">编辑Webhook</h1>
      </div>
      <div className="rounded-md border p-4">
        <WebhookForm initialData={webhook} />
      </div>
    </div>
  );
}
