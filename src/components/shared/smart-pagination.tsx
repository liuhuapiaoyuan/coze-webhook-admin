"use client";

import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * Props for the SmartPagination component.
 * @interface SmartPaginationProps
 */
interface SmartPaginationProps {
  /** Current page number */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
  /** Callback function for previous page action */
  onPrev?: () => void;
  /** Callback function for next page action */
  onNext?: () => void;
  /** Callback function when page changes */
  onChange?: (page: number, pageSize: number) => void;
  /** Callback function when page size changes */
  onChangePageSize?: (pageSize: number) => void;
  /** Available options for page size */
  pageSizeOptions?: number[];
  /** Whether to show the page size changer */
  showSizeChanger?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * SmartPagination component for handling pagination with customizable options.
 * @param {SmartPaginationProps} props - The props for the SmartPagination component
 */
export function SmartPagination({
  page,
  pageSize,
  total,
  onPrev,
  onNext,
  className,
  style,
  onChange,
  onChangePageSize,
  pageSizeOptions = [10, 20, 30, 50],
  showSizeChanger = false,
  ref,
}: SmartPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const pageNumbers = useMemo(() => {
    const generatePageNumbers = () => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (page <= 4) {
        return [1, 2, 3, 4, 5, "ellipsis", totalPages];
      }

      if (page >= totalPages - 3) {
        return [
          1,
          "ellipsis",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      }

      return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
    };

    return generatePageNumbers();
  }, [page, totalPages]);

  /**
   * Handles page change
   * @param {number} newPage - The new page number
   */
  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    if (newPage < 1 || newPage > totalPages) return;
    onChange?.(newPage, pageSize);
  };

  /**
   * Handles previous page action
   */
  const handlePrev = () => {
    if (page > 1) {
      onChange?.(page - 1, pageSize);
      onPrev?.();
    }
  };

  /**
   * Handles next page action
   */
  const handleNext = () => {
    if (page < totalPages) {
      onChange?.(page + 1, pageSize);
      onNext?.();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2",
        showSizeChanger && "justify-between",
        className
      )}
      style={style}
    >
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((pageNumber, index) => (
            <PaginationItem key={index}>
              {pageNumber === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(pageNumber as number)}
                  isActive={page === pageNumber}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                page >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {showSizeChanger ? (
        <div className="flex items-center gap-2">
          <span className="text-nowrap text-sm text-muted-foreground">
            每页
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              onChange?.(page, Number(value));
              onChangePageSize?.(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-nowrap text-sm text-muted-foreground">
            共{total}条
          </span>
        </div>
      ) : (
        <span className="text-nowrap text-sm text-muted-foreground">
          共{total}条
        </span>
      )}
    </div>
  );
}
