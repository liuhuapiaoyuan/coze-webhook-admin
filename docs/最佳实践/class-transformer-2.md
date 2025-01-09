### 扩展：反序列化将 `User` 转换为 `UserBase`

在上一篇文章中，我们演示了如何使用 `@Transform` 装饰器将逗号分隔的字符串转换为字符串数组。接下来，我们将扩展该示例，展示如何在反序列化时，将一个 `User` 类实例转换回 `UserBase` 类实例，尤其是当 `User` 类中的字段是数组时，我们希望将其转换为逗号分隔的字符串。

在实际开发中，我们常常需要在不同的层之间进行数据转换。例如，可能有一个与数据库或 API 交互的原始数据对象（`UserBase`），以及一个业务逻辑层的数据对象（`User`）。这时，我们需要进行双向转换——从原始数据对象到业务对象（序列化），以及从业务对象到原始数据对象（反序列化）。通过 `class-transformer` 提供的 `@Transform` 装饰器和 `toClassOnly` 选项，我们可以灵活地实现这种双向转换。

### 反序列化：将 `User` 转换为 `UserBase`

假设我们在反序列化时需要将 `User` 类的 `tags` 字段从字符串数组转换回逗号分隔的字符串。为了实现这一点，我们同样使用 `@Transform` 装饰器，只是这次是将数组转换回字符串。

### 代码实现

```typescript
import { plainToClass, classToPlain, Transform } from "class-transformer";

// 原始类，tags 是一个逗号分隔的字符串
class UserBase {
  tags: string;
}

// 改进后的类，tags 是一个字符串数组
class User {
  @Transform(({ value }) => value.split(","), { toClassOnly: true }) // 将字符串转换为数组
  @Transform(({ value }) => value.join(","), { toPlainOnly: true }) // 将数组转换为逗号分隔的字符串
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

// 将 User 实例转换回 UserBase
const userBaseObjFromUser = classToPlain(user);
console.log(userBaseObjFromUser); // { tags: 'tag1,tag2,tag3' }
```

### 解析

1. **`User` 类中的 `tags` 字段**：
   在 `User` 类中，`tags` 字段定义为一个字符串数组。我们在该字段上使用了两个 `@Transform` 装饰器：

   - 第一个装饰器将逗号分隔的字符串（如 `'tag1,tag2,tag3'`）转换为字符串数组。
   - 第二个装饰器则是反向转换，它将字符串数组转换回逗号分隔的字符串。这个转换函数使用 `join(',')` 方法将数组中的元素连接成一个字符串。

2. **序列化（`plainToClass`）**：
   在序列化过程中，我们将原始数据对象（`userBaseObj`）转换为 `User` 类实例。此时，`tags` 字段会被转换为数组 `["tag1", "tag2", "tag3"]`。

3. **反序列化（`classToPlain`）**：
   在反序列化过程中，我们将 `User` 类实例（`user`）转换回普通的对象。此时，`tags` 字段会被转换回逗号分隔的字符串 `'tag1,tag2,tag3'`。

   `toPlainOnly: true` 表示这个转换只会在从类实例转换回普通对象时生效，而不会在将普通对象转换为类实例时进行。这可以确保我们在 `classToPlain` 时进行转换，而在 `plainToClass` 时不做修改。

### 小结

通过使用 `@Transform` 装饰器，我们不仅可以轻松地将逗号分隔的字符串转换为字符串数组，还可以在反向转换时将字符串数组转换回逗号分隔的字符串。这使得我们能够在不同的数据表示（例如数据库存储格式和业务逻辑层的格式）之间进行灵活转换。

这种方式不仅能简化数据的转换逻辑，还能保证在整个应用中保持一致的处理方式，尤其适用于在 ORM 对象与业务对象之间的转换。例如，使用 Prisma ORM 时，我们可以通过这种方式实现字段类型的转换，使得我们在操作数据时能够避免手动转换的繁琐。

这种灵活的转换方式，使得我们在进行数据的序列化和反序列化时，能够更加简洁和高效。
