import { LogOut } from "lucide-react";
import { BadgeCheck, Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserBar } from "./user-bar";
import { auth, signOut } from "@/lib/auth";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { redirect } from "next/navigation";
import { QuickLink } from "./quick-link";
import { APP_MENUS } from "../const/app-actions";
import Image from "next/image";

export async function AppSidebar() {
  const session = await auth();
  if (!session?.user) {
    return;
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    src="/coze.png"
                    alt="COZE"
                    width={124}
                    height={124}
                    className="size-full"
                  />
                </div>
                <div className=" grid flex-1 text-left text-sm leading-tight group-[&[data-state=collapsed]]:hidden ">
                  <span className="truncate font-semibold">COZE服务</span>
                  <span className="truncate text-xs">后台管理系统</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex gap-2">
            <div className="flex-1">
              <QuickLink />
            </div>
            <div>
              <ThemeToggle />
            </div>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup className="flex-1">
          {APP_MENUS.map((menu) => (
            <SidebarGroupContent title={menu.title} key={menu.id}>
              <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
              <SidebarMenu>
                {menu.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        target={item.target}
                        rel={
                          item.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <item.icon className="mr-3 h-5 w-5" />

                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ))}
        </SidebarGroup>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <div className="p-2 group-data-[state=collapsed]:hidden">
                  <UserBar
                    username={session.user.username!}
                    email={session.user.email!}
                  />
                </div>
                <div className="hidden group-data-[state=collapsed]:block">
                  <Avatar className="h-8 w-8 cursor-pointer rounded-sm border hover:shadow">
                    <AvatarImage
                      src={session.user.image!}
                      alt={session.user.username!}
                    />
                    <AvatarFallback className="rounded-sm">
                      {session.user.username!.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <UserBar
                  username={session.user.username!}
                  email={session.user.email!}
                />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  redirect("/admin/profile");
                }}
              >
                <BadgeCheck />
                账户信息
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  redirect("/subscribe");
                }}
              >
                <Bell />
                订阅
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  "use server";
                  await signOut({
                    redirectTo: "/",
                  });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <LogOut />
                退出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
