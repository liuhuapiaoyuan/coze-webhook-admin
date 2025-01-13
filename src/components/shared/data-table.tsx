"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

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
 * @template TValue 表格单元格值类型
 */
interface DataTableProps<TData, TValue> {
  /** 表格列定义 */
  columns: ColumnDef<TData, TValue>[];
  /** 表格数据 */
  data: TData[];
  /** 总行数（用于分页） */
  rowCount?: number;
  /** 当前页码 */
  pageNumber?: number;
  /** 每页显示的行数 */
  pageSize?: number;
  /** 自定义空数据时的渲染内容 */
  empty?: React.ReactNode;
  /** 空数据时的提示消息 */
  emptyMessage?: string;
  /** 分页变化时的回调函数 */
  onPagination?: (pageIndex: number, pageSize: number) => void;
  /** 可选的每页显示行数选项 */
  pageSizeOptions?: number[];
  /** 是否正在加载数据 */
  loading?: boolean;
  /** 是否启用虚拟滚动 */
  virtual?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  onPagination,
  emptyMessage = "没有数据",
  empty,
  pageNumber = 1,

  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  loading = false,
  virtual = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { pagination: { pageIndex: pageNumber - 1, pageSize } },
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const visibleColumns = table.getVisibleLeafColumns();

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
  });

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();
  const virtualRows = rowVirtualizer.getVirtualItems();

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;
  if (virtual && columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  const renderTableContent = () => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {columns.map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }

    if (!rows.length) {
      return (
        empty ?? (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )
      );
    }

    if (virtual) {
      return virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];
        return (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            data-index={virtualRow.index}
            ref={(node) => rowVirtualizer.measureElement(node)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {virtualPaddingLeft ? (
              <TableCell style={{ width: virtualPaddingLeft }} />
            ) : null}
            {virtualColumns.map((vc) => {
              const cell = row.getVisibleCells()[vc.index];
              return (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
            {virtualPaddingRight ? (
              <TableCell style={{ width: virtualPaddingRight }} />
            ) : null}
          </TableRow>
        );
      });
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <>
      <div
        className="rounded-md border"
        ref={tableContainerRef}
        style={virtual ? { height: "800px", overflow: "auto" } : {}}
      >
        <Table style={virtual ? { display: "grid" } : {}}>
          <TableHeader
            style={
              virtual
                ? { display: "grid", position: "sticky", top: 0, zIndex: 1 }
                : {}
            }
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                style={virtual ? { display: "flex", width: "100%" } : {}}
              >
                {virtual && virtualPaddingLeft ? (
                  <TableHead style={{ width: virtualPaddingLeft }} />
                ) : null}
                {(virtual ? virtualColumns : visibleColumns).map((column) => {
                  const header = virtual
                    ? {
                        virtual: true as const,
                        header:
                          headerGroup.headers[
                            (column as (typeof virtualColumns)[0]).index
                          ],
                      }
                    : {
                        virtual: false as const,
                        header:
                          headerGroup.headers[
                            (column as (typeof visibleColumns)[0]).getIndex()
                          ],
                      };
                  return (
                    <TableHead
                      key={header.header.id}
                      style={virtual ? { width: header.header.getSize() } : {}}
                    >
                      {header.virtual && header.header.isPlaceholder
                        ? null
                        : flexRender(
                            header.header.column.columnDef.header,
                            header.header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                {virtual && virtualPaddingRight ? (
                  <TableHead style={{ width: virtualPaddingRight }} />
                ) : null}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={
              virtual
                ? {
                    display: "grid",
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    position: "relative",
                  }
                : {}
            }
          >
            {renderTableContent()}
          </TableBody>
        </Table>
      </div>
      <SmartPagination
        className="mt-4"
        page={table.getState().pagination.pageIndex + 1}
        pageSize={table.getState().pagination.pageSize}
        total={rowCount ?? table.getRowCount()}
        onChange={onPagination}
        pageSizeOptions={pageSizeOptions}
        showSizeChanger
      />
    </>
  );
}
