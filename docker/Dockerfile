FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY  ./next.docker.ts  ./next.config.ts

# 生成配置文件
RUN pnpm run db:generate
RUN pnpm run build


# 创建运行环境
FROM base as runtime
# 设置工作目录
WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL="file:/config/db.sqlite"

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

 


EXPOSE 3000
ENV PORT 3000
ENV HOST 0.0.0.0


CMD ["npm","run", "server:start"]
