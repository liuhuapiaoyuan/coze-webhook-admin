"use client";
import { DataTable } from "@/components/shared/data-table";
import { columns, WebhookWithCount } from "./columns";
const data = new Array(10000).fill(1).map((_item, index) => ({
  id: `Test ${index}`,
  name: `name ${index}`,
  url: `url ${index}`,
  createdAt: new Date(),
  _count: {
    apiEndpoints: 1,
    logs: 2,
  },
  updatedAt: new Date(),
  authorization: `authorization ${index}`,
})) as WebhookWithCount[];

export function DemoTable() {
  return (
    <DataTable
      rowCount={10000}
      pageNumber={1}
      pageSize={20}
      virtual
      rowVirtualOptions={{
        estimateSize: () => 50,
      }}
      columns={columns}
      data={data}
    />
  );
}
