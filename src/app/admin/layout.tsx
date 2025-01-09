import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "数字人后台管理系统",
  description: "Admin dashboard for digital human management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-5">
        <div className="mb-2">
          <SidebarTrigger />
        </div>
        <div className="bg-background/15">{children}</div>
      </main>
    </SidebarProvider>
  );
}
