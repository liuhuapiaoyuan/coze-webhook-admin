import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export async function LandingNav() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-xl font-bold text-transparent">
              数字人管理系统
            </span>
          </Link>
          <div className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              功能特点
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              价格方案
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              关于我们
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <Button asChild>
              <Link href="/dashboard">进入控制台</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">登录</Link>
              </Button>
              <Button asChild>
                <Link href="/register">立即注册</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
