import { Prisma, PrismaClient } from "@prisma/client";

function createPrisma() {
  return new PrismaClient().$extends({
    model: {
      $allModels: {
        async exists<T>(
          this: T,
          where: Prisma.Args<T, "findFirst">["where"]
        ): Promise<boolean> {
          const context = Prisma.getExtensionContext(this);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = await (context as any).findFirst({ where });
          return result !== null;
        },
      },
    },
  });
}

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof createPrisma>;
}

let prisma: ReturnType<typeof createPrisma>;
if (process.env.NODE_ENV === "production") {
  prisma = createPrisma();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrisma();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
