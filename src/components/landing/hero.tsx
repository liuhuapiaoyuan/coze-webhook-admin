import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="container relative mx-auto min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          数字人管理系统
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "这个平台让我们能够轻松管理和部署数字人，大大提高了我们的工作效率。"
            </p>
            <footer className="text-sm">某科技公司 CEO</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              智能数字人管理平台
            </h1>
            <p className="text-sm text-muted-foreground">
              一站式数字人管理解决方案，让您的数字人管理更简单、更高效
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">免费试用</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">了解更多</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
