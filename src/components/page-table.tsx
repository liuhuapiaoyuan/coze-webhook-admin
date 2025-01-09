import { DataTable } from "@/components/shared/data-table";
import { redirect } from "next/navigation";
import {
  parseAsInteger,
  createLoader,
  inferParserType,
  parseAsString,
} from "nuqs/server";
import { ColumnDef } from "@/components/shared/data-table";
import { SearchForm } from "./search-form";
import { Input } from "./ui/input";

const pageSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  keyword: parseAsString.withOptions({}),
};

/**
 * PageTableProps 定义了 PageTable 组件的属性类型
 * @template T 扩展了基本分页参数的查询参数类型
 * @template D 表格数据项的类型
 */
export type PageTableProps<
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
  /** 可选的每页显示数量选项 */
  pageSizeOptions?: number[];
  /** 表格列定义 */
  columns: ColumnDef<D>[];
  /**
   * 加载数据的函数
   * @param params 查询参数
   * @returns 包含数据和总数的 Promise
   */
  load(params: inferParserType<T>): Promise<{
    data: D[];
    total: number;
  }>;
};

export default async function PageTable<
  D,
  T extends {
    page: typeof pageSearchParams.page;
    pageSize: typeof pageSearchParams.pageSize;
    keyword: typeof pageSearchParams.keyword;
  },
>({
  searchParams,
  queryParse = pageSearchParams as T,
  load,
  columns,
  showQuickSearch = true,
  basePath,
  pageSizeOptions = [10, 20, 30, 50],
}: PageTableProps<T, D>) {
  const loadSearchParams = createLoader(queryParse);
  const params = await loadSearchParams(searchParams);
  const originSearchParams = await searchParams;
  const { data, total } = await load(params);

  const onPagination = async (
    page: number,
    pageSize: number
  ): Promise<never> => {
    "use server";
    const newParams = new URLSearchParams(originSearchParams);
    newParams.set("page", page.toString());
    newParams.set("pageSize", pageSize.toString());
    const separator = basePath.includes("?") ? "&" : "?";
    redirect(`${basePath}${separator}${newParams.toString()}`);
  };
  return (
    <>
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
      <DataTable
        rowCount={total}
        pageNumber={params.page}
        pageSizeOptions={pageSizeOptions}
        pageSize={params.pageSize}
        onPagination={onPagination}
        columns={columns}
        data={data}
      />
    </>
  );
}
