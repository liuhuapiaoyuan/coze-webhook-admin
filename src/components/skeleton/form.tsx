import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonForm() {
  return (
    <div className="container mx-auto p-8 animate-in fade-in-50">
      {/* 页面标题骨架 */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* 表单骨架 */}
      <div className="space-y-6">
        {/* 输入框骨架 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}

        {/* 文本区域骨架 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* 选择框骨架 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* 复选框骨架 */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* 提交按钮骨架 */}
        <Skeleton className="h-10 w-full max-w-xs" />
      </div>

      {/* Sketch 风格装饰 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-background/5 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="absolute -inset-px rounded-lg border border-foreground/10" />

        <div className="absolute -inset-[2px] rounded-lg border border-foreground/5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  );
}
