import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            扣子Hook服务
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-full md:w-[500px]">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden flex-col items-center justify-center gap-2 bg-muted md:flex ">
        <Image
          src="/coze.png"
          alt="Image"
          width={500}
          height={500}
          className="h-40 w-40"
        />
        <span>
          <h2 className="text-xl font-bold tracking-tight">COZE服务</h2>
          <p className="text-sm text-muted-foreground">
            扣子Hook服务是一个用于扣子Hook的开源服务，为您提供扣子Hook的一站式服务。
          </p>
        </span>
      </div>
    </div>
  );
}
