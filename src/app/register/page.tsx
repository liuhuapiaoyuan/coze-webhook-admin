import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "COZE注册服务暂停",
  description: "注册服务暂停",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="flex items-center justify-center text-yellow-500">
          <AlertCircle size={48} />
        </div>
        <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
          系统暂停注册服务
        </h1>
        <p className="mt-2 text-center text-gray-600">
          感谢您的关注。我们正在进行系统维护，暂时无法提供注册服务。
        </p>
        <div className="mt-6 text-center text-sm text-blue-500">
          请稍后再来尝试，或联系客户支持获取更多信息。
        </div>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
