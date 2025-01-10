"use client";

import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import { getEndpointRecords } from "../actions";
import { useEffect, useState } from "react";
import { ApiEndpointLog } from "@prisma/client";
import Link from "next/link";

interface RecordsListProps {
  endpointId: string;
}

const columns: ColumnDef<ApiEndpointLog>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Link
        href={`/admin/api-logs/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => {
      return (
        <span
          className={
            row.original.status === "failed" ? "text-red-600" : "text-green-600"
          }
        >
          {row.original.status}
        </span>
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP地址",
  },
  {
    accessorKey: "duration",
    header: "耗时(ms)",
  },
  {
    accessorKey: "createdAt",
    header: "调用时间",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
];

export function RecordsList({ endpointId }: RecordsListProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [data, setData] = useState<{
    data: ApiEndpointLog[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEndpointRecords(endpointId, { page, pageSize })
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
