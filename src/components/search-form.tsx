import { createLoader, inferParserType, parseAsInteger } from "nuqs/server";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
const onSearch = async (
  basePath: string,
  data: FormData,
  params: { [key: string]: string },
  originSearchParams: {
    [key: string]: string;
  }
): Promise<never> => {
  "use server";
  const newParams = new URLSearchParams(originSearchParams);
  newParams.set("page", "1");
  Object.entries(params).map(([key]) => {
    const newValue = data.get(key)?.toString();
    if (newValue) {
      newParams.set(key, newValue);
    } else {
      newParams.delete(key);
    }
  });
  const separator = basePath.includes("?") ? "&" : "?";
  redirect(`${basePath}${separator}${newParams.toString()}`);
};
const pageSearchParams = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
};

async function onReset(
  basePath: string,
  params: { [key: string]: string },
  originSearchParams: {
    [key: string]: string;
  }
) {
  "use server";
  const newParams = new URLSearchParams(originSearchParams);
  newParams.set("page", "1");
  Object.entries(params).map(([key]) => {
    newParams.delete(key);
  });
  // 清理所有的检索任务
  const separator = basePath.includes("?") ? "&" : "?";
  redirect(`${basePath}${separator}${newParams.toString()}`);
}
export async function SearchForm<
  T extends {
    page: typeof pageSearchParams.page;
    pageSize: typeof pageSearchParams.pageSize;
  },
>(props: {
  basePath: string;
  queryParse?: T;
  searchParams: PageProps["searchParams"];
  children?:
    | React.ReactNode
    | ((formValue: inferParserType<T>) => React.ReactNode);
}) {
  const { searchParams, queryParse = pageSearchParams as T, basePath } = props;
  const loadSearchParams = createLoader(queryParse);
  const params = await loadSearchParams(searchParams);
  const originSearchParams = await searchParams;

  return (
    <div className="mb-4">
      <form
        action={async (data) => {
          "use server";
          await onSearch(basePath, data, params, originSearchParams);
        }}
        className="flex space-x-2"
      >
        {typeof props.children === "function"
          ? props.children(params)
          : props.children}
        <Button type="submit">搜索</Button>
        <Button
          formAction={async () => {
            "use server";
            await onReset(basePath, params, originSearchParams);
          }}
          type="submit"
          variant={"outline"}
        >
          重置
        </Button>
      </form>
    </div>
  );
}
