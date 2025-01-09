# PageTable 组件

PageTable 是一个通用的分页表格组件，用于展示和管理分页数据。它封装了数据加载、分页逻辑和 UI 渲染，提供了一个简单易用的接口来创建可定制的数据表格。

## 属性

| 属性名          | 类型                                                                     | 描述                                              |
| --------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| searchParams    | `SearchParams`                                                           | 当前页面的搜索参数                                |
| queryParse      | `T`                                                                      | 自定义查询参数解析器，默认使用 `pageSearchParams` |
| load            | `(params: inferParserType<T>) => Promise<{ data: D[]; total: number; }>` | 加载数据的异步函数                                |
| columns         | `ColumnDef<D>[]`                                                         | 表格列定义                                        |
| basePath        | `string`                                                                 | 基础路径，用于构建分页 URL                        |
| pageSizeOptions | `number[]`                                                               | 可选的每页显示数量选项，默认为 `[10, 20, 30, 50]` |

## 使用示例

```tsx
import PageTable from "@/components/PageTable";
import { ColumnDef } from "@/components/shared/data-table";

// 定义数据类型
interface User {
  id: string;
  name: string;
  email: string;
}

// 定义列
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "email",
    header: "邮箱",
  },
];

// 在页面组件中使用
export default function UsersPage({ searchParams }) {
  return (
    <PageTable<User>
      searchParams={searchParams}
      basePath="/users"
      columns={columns}
      load={async (params) => {
        // 实现数据加载逻辑
        const response = await fetch(
          `/api/users?page=${params.page}&pageSize=${params.pageSize}`
        );
        const { data, total } = await response.json();
        return { data, total };
      }}
    />
  );
}
```

这个示例展示了如何使用 PageTable 组件来创建一个用户列表页面。组件会自动处理分页、数据加载和表格渲染，大大简化了开发过程。
