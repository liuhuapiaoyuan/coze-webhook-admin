"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SmartPagination } from "./smart-pagination";
import { Skeleton } from "@/components/ui/skeleton";

export type { ColumnDef } from "@tanstack/react-table";
/**
 * DataTable 组件的属性接口
 * @template TData 表格数据类型
 * @template TValue 表格值类型
 */
interface DataTableProps<TData, TValue> {
  /** 表格列定义 */
  columns: ColumnDef<TData, TValue>[];
  /** 表格数据 */
  data: TData[];
  /** 总行数（可选） */
  rowCount?: number;
  /** 当前页码（可选） */
  pageNumber?: number;
  /** 每页显示的行数（可选） */
  pageSize?: number;
  /** 自定义空状态组件（可选） */
  empty?: React.ReactNode;
  /** 空状态消息（可选） */
  emptyMessage?: string;
  /** 分页变化回调函数（可选） */
  onPagination?: (pageIndex: number, pageSize: number) => void;
  /** 可选的每页显示行数选项（可选） */
  pageSizeOptions?: number[];
  /** 加载状态（可选） */
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  onPagination,
  emptyMessage = "没有数据",
  empty,
  pageNumber: pageNumber = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  loading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: { pagination: { pageIndex: pageNumber - 1, pageSize } },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : (empty ?? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        {emptyMessage}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
      <SmartPagination
        className="mt-4"
        page={table.getState().pagination.pageIndex + 1}
        pageSize={table.getState().pagination.pageSize}
        total={table.getRowCount()}
        onChange={onPagination}
        pageSizeOptions={pageSizeOptions}
        showSizeChanger
      />
    </>
  );
}
