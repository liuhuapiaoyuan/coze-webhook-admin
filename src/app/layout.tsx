import type { Metadata } from "next";
import "./global.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

declare global {
  type SearchParams = Promise<{ [key: string]: string }>;
  type PageProps = {
    searchParams: SearchParams;
  };
}

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
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>{children}</NuqsAdapter>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
