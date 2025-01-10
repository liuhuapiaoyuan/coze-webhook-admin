"use client";

import { ApiKey } from "@prisma/client";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import { getEndpointKeys } from "../actions";
import { useEffect, useState } from "react";

interface KeysListProps {
  endpointId: string;
}

const columns: ColumnDef<ApiKey>[] = [
  {
    accessorKey: "key",
    header: "密钥",
  },
  {
    accessorKey: "name",
    header: "名称",
  },
  {
    accessorKey: "createdAt",
    header: "创建时间",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    accessorKey: "expiresAt",
    header: "过期时间",
    // cell: ({ row }) =>
    //   row.original.expiresAt
    //     ? formatDateTime(row.original.expiresAt)
    //     : "永不过期",
  },
];

export function KeysList({ endpointId }: KeysListProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState<{ data: ApiKey[]; total: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEndpointKeys(endpointId, { page, pageSize })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [endpointId, page, pageSize]);
  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      pageNumber={page}
      rowCount={data?.total}
      pageSize={pageSize}
      loading={loading}
      onPagination={(page, pageSize) => {
        setPage(page);
        setPageSize(pageSize);
      }}
    />
  );
}
