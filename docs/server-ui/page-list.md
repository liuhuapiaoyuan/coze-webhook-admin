# PageList 组件

PageList 是一个用于展示分页列表数据的 React 组件。它提供了灵活的数据加载、分页和渲染选项。

## 属性

| 属性         | 类型      | 描述                                              |
| ------------ | --------- | ------------------------------------------------- |
| searchParams | object    | 当前的搜索参数对象                                |
| queryParse   | object    | 自定义查询参数解析器，默认使用 `pageSearchParams` |
| basePath     | string    | 基础路径，用于构建分页 URL                        |
| load         | function  | 加载数据的异步函数                                |
| renderItem   | function  | 渲染每个列表项的函数                              |
| empty        | ReactNode | 自定义空状态组件                                  |
| emptyMessage | string    | 空状态显示的消息                                  |
| onDelete     | function  | 删除项目的回调函数（可选）                        |

## 使用示例

```tsx
import PageList from "@/components/PageList";
import { UserCard } from "@/components/UserCard";

export default function UsersPage({ searchParams }) {
  return (
    <PageList<User>
      searchParams={searchParams}
      basePath="/users"
      load={async (params) => {
        const response = await fetch(
          `/api/users?page=${params.page}&pageSize=${params.pageSize}`
        );
        return await response.json();
      }}
      renderItem={(user, index) => <UserCard key={user.id} user={user} />}
      emptyMessage="暂无用户数据"
    />
  );
}
```

## 说明

1. 组件会自动处理分页逻辑，包括 URL 参数的更新。
2. 可以通过 `queryParse` 属性自定义查询参数的解析方式。
3. `load` 函数需要返回一个包含 `data` 和 `total` 的对象。
4. 组件内置了空状态的展示，可以通过 `empty` 和 `emptyMessage` 属性自定义。
5. 分页控件使用了 `SmartPagination` 组件，支持改变每页显示数量。

通过使用 PageList 组件，可以快速构建具有分页功能的列表页面，减少重复代码，提高开发效率。
