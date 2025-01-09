export {}; // 显式将文件标记为模块
import { Prisma } from "@prisma/client";

declare global {
  // you can use typical basic types
  // or you can use classes, interfaces, object types, etc.
  namespace PrismaJson {
    type StringArray = string[] | null;
  }
  type PageableQuery<T> = {
    page: number;
    pageSize: number;
    where?: Prisma.Args<T, "findMany">["where"];
    orderBy?: Prisma.Args<T, "findMany">["orderBy"];
    include?: Prisma.Args<T, "findMany">["include"];
  };
}
