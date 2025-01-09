import { Plus } from "lucide-react";
import { SmartPagination } from "@/components/shared/smart-pagination";
import {
  parseAsInteger,
  createLoader,
  inferParserType,
  parseAsString,
} from "nuqs/server";
import { redirect } from "next/navigation";
import { SearchForm } from "./search-form";
import { Input } from "./ui/input";

export const pageSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  keyword: parseAsString.withOptions({}),
};

export type PageListProps<
  T extends {
    page: typeof pageSearchParams.page;
    pageSize: typeof pageSearchParams.pageSize;
    keyword: typeof pageSearchParams.keyword;
  },
  D,
> = PageProps & {
  /** 显示快速检索 */
  showQuickSearch?: boolean;

  /** 自定义查询参数解析器 */
  queryParse?: T;
  /** 基础路径，用于构建分页 URL */
  basePath: string;
  /**
   * 加载数据的函数
   * @param params 查询参数
   * @returns 包含数据和总数的 Promise
   */
  load(params: inferParserType<T>): Promise<{
    data: D[];
    total: number;
  }>;
  onDelete?: (id: string) => Promise<{ error?: string; success?: boolean }>;
  renderItem: (item: D, index: number) => React.ReactNode;

  emptyMessage?: string;
  empty?: React.ReactNode;
};

export default async function PageList<
  D,
  T extends {
    page: typeof pageSearchParams.page;
    pageSize: typeof pageSearchParams.pageSize;
    keyword: typeof pageSearchParams.keyword;
  },
>({
  empty,
  emptyMessage,
  showQuickSearch,
  searchParams,
  queryParse = pageSearchParams as T,
  basePath,
  load,
  renderItem,
}: PageListProps<T, D>) {
  const loadSearchParams = createLoader(queryParse);
  const params = await loadSearchParams(searchParams);
  const { data, total } = await load(params);

  const onPagination = async (
    page: number,
    pageSize: number
  ): Promise<never> => {
    "use server";
    const searchParams = new URLSearchParams();
    searchParams.set("page", page.toString());
    searchParams.set("pageSize", pageSize.toString());
    const separator = basePath.includes("?") ? "&" : "?";
    redirect(`${basePath}${separator}${searchParams.toString()}`);
  };
  return (
    <div className="container mx-auto py-10">
      {showQuickSearch && (
        <SearchForm
          basePath={basePath}
          searchParams={searchParams}
          queryParse={queryParse}
        >
          {(search) => {
            return (
              <Input
                className="max-w-xs"
                defaultValue={search.keyword ?? ""}
                placeholder="快速检索"
                name="keyword"
              />
            );
          }}
        </SearchForm>
      )}
      {data.length < 1 &&
        (empty ?? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Plus className="h-10 w-10" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">没有数据</h2>
              <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
                {emptyMessage}
              </p>
            </div>
          </div>
        ))}
      {total > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map(renderItem)}
          </div>
          <SmartPagination
            className="mt-5"
            page={params.page}
            pageSize={params.pageSize}
            total={total}
            pageSizeOptions={[10, 20, 30, 50]}
            showSizeChanger
            onChange={onPagination}
          />
        </>
      )}
    </div>
  );
}
