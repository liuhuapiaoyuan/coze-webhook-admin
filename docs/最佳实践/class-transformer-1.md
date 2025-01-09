### 使用 `@Transform` 装饰器实现自定义转换：实现存储跟业务对象的转换

在 TypeScript 项目中，我们经常需要对数据进行某些自定义转换，特别是在处理外部数据（例如 API 请求的响应）和业务逻辑层的数据之间的转换时。`class-transformer` 库提供了一个非常实用的工具——`@Transform` 装饰器，它使得我们能够方便地实现自定义的字段转换。

本文将介绍如何利用 `@Transform` 装饰器将一个逗号分隔的字符串转换为一个字符串数组，并通过实际示例展示如何在业务对象中使用这种转换。

### 问题背景

假设我们有一个 `UserBase` 类，它包含了一个字段 `tags`，这是一个以逗号分隔的字符串。在我们的业务对象 `User` 中，`tags` 需要是一个字符串数组。因此，在从数据库或 API 接收数据时，我们需要将这个逗号分隔的字符串转化为一个数组。通过使用 `class-transformer` 提供的 `@Transform` 装饰器，我们可以轻松实现这一点。

### 解决方案

`class-transformer` 提供了 `@Transform` 装饰器，可以用来为字段定义自定义的转换逻辑。我们将为 `tags` 字段创建一个转换函数，该函数会将逗号分隔的字符串转化为字符串数组。

### 步骤

1. 使用 `@Transform` 装饰器来处理字段的转换。
2. 编写一个函数来将逗号分隔的字符串转换为字符串数组。
3. 使用 `plainToClass` 来进行对象转换。

### 代码实现

```typescript
import { plainToClass, Transform } from "class-transformer";

// 原始类，tags 是一个逗号分隔的字符串
class UserBase {
  tags: string;
}

// 改进后的类，tags 是一个字符串数组
class User {
  @Transform(({ value }) => value.split(","), { toClassOnly: true }) // 将字符串转换为数组
  tags: string[];

  constructor(tags: string[]) {
    this.tags = tags;
  }
}

// 用户传入的数据是一个字符串，其中 tags 是逗号分隔的
const userBaseObj = {
  tags: "tag1,tag2,tag3",
};

// 使用 plainToClass 来进行转换
const user = plainToClass(User, userBaseObj);

console.log(user instanceof User); // true
console.log(user.tags); // ["tag1", "tag2", "tag3"]
```

### 解析

1. **原始类 `UserBase`**：
   `UserBase` 类中定义了一个字段 `tags`，它是一个简单的逗号分隔字符串。在实际的应用中，类似的字段可能来自于数据库或者外部 API 的响应。

2. **目标类 `User`**：
   `User` 类中的 `tags` 字段定义为一个字符串数组。我们通过使用 `@Transform` 装饰器来实现从字符串到数组的转换。

3. **`@Transform` 装饰器**：
   `@Transform` 装饰器的第一个参数是一个函数，这个函数接收一个对象作为参数，其中包含了原始字段的值。我们利用 `split(',')` 方法将逗号分隔的字符串转换为一个字符串数组。

   `toClassOnly: true` 的配置表示这个转换只会在 `plainToClass` 时生效，即将普通对象转换为类实例时，而不会影响反向转换（即类实例转换为普通对象时）。

4. **转换过程**：
   当我们调用 `plainToClass` 方法时，`tags` 字段会从字符串 `"tag1,tag2,tag3"` 转换为数组 `["tag1", "tag2", "tag3"]`，这样我们就得到了符合业务需求的 `User` 类实例。

### 小结

通过使用 `class-transformer` 提供的 `@Transform` 装饰器，我们能够灵活地进行字段的类型转换，尤其是在需要对字段进行一些特定处理（例如将逗号分隔的字符串转换为数组）时。这种方式不仅简化了代码的维护，还能帮助我们在 ORM 对象和业务对象之间进行高效的转换。

### 实际应用场景

这种转换方式在实际开发中非常有用，特别是在与数据库或外部 API 交互时。举个例子，假设我们使用 Prisma ORM 进行数据库操作，并且需要将数据库中的字符串字段（如 `tags`）转换为业务对象中的数组字段，这时 `@Transform` 装饰器就能非常方便地帮助我们实现这种需求。

总的来说，`class-transformer` 提供了非常强大且灵活的功能，能够让开发者轻松处理复杂的数据转换逻辑。
