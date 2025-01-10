import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          页面未找到
        </h2>
        <p className="mt-2 text-muted-foreground">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-home"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />

                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              返回首页
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>如果您认为这是一个错误，请联系管理员。</p>
      </div>
    </div>
  );
}
