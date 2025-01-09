import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-8 animate-in fade-in-50">
      {/* 页面标题骨架 */}
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* 卡片列表骨架 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-lg border bg-background p-2"
          >
            {/* 卡片图片骨架 */}
            <Skeleton className="aspect-video w-full rounded-md" />

            {/* 卡片内容骨架 */}
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              {/* 标签骨架 */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />

                <Skeleton className="h-6 w-20 rounded-full" />

                <Skeleton className="h-6 w-14 rounded-full" />
              </div>

              {/* 描述骨架 */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              {/* 底部信息骨架 */}
              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* Sketch 风格装饰 */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-background/5 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="absolute -inset-px rounded-lg border border-foreground/10" />

              <div className="absolute -inset-[2px] rounded-lg border border-foreground/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
