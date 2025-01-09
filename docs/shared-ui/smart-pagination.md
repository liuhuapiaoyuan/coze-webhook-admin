# SmartPagination 组件

SmartPagination 是一个灵活的分页组件，提供了自定义选项和页面大小更改功能。

## 使用场景

该组件适用于需要分页功能的列表或表格展示，特别是在数据量较大时。它允许用户轻松地在不同页面间导航，并可选择每页显示的项目数量。

## 使用示例

```jsx
import { SmartPagination } from "@/components/shared/smart-pagination";

function MyComponent() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 100;

  return (
    <SmartPagination
      page={page}
      pageSize={pageSize}
      total={total}
      onChange={setPage}
      onChangePageSize={setPageSize}
      showSizeChanger={true}
    />
  );
}
```

## 属性

| 属性名           | 类型                                    | 默认值           | 描述                                     |
| ---------------- | --------------------------------------- | ---------------- | ---------------------------------------- |
| page             | number                                  | -                | 当前页码（必填）                         |
| pageSize         | number                                  | -                | 每页项目数（必填）                       |
| total            | number                                  | -                | 总项目数（必填）                         |
| onPrev           | () => void                              | -                | 上一页回调函数（会先触发onChange）       |
| onNext           | () => void                              | -                | 下一页回调函数（会先触发onChange）       |
| onChange         | (page: number,pageSize: number) => void | -                | 页码变化回调函数                         |
| onChangePageSize | (pageSize: number) => void              | -                | 每页项目数变化回调函数(会先触发onChange) |
| pageSizeOptions  | number[]                                | [10, 20, 30, 50] | 可选的每页项目数                         |
| showSizeChanger  | boolean                                 | false            | 是否显示每页项目数选择器                 |
| className        | string                                  | -                | 额外的 CSS 类名                          |
| style            | React.CSSProperties                     | -                | 内联样式                                 |
| ref              | React.Ref<HTMLDivElement>               | -                | Ref 引用                                 |

## 注意事项

- 确保为必填属性（page, pageSize, total）提供正确的值。
- 如果需要自定义页码变化或页面大小变化的行为，请提供相应的回调函数（onChange, onChangePageSize）。
- 设置 `showSizeChanger` 为 true 可启用每页项目数选择功能。
- 组件会根据总页数自动调整页码显示逻辑，确保良好的用户体验。
