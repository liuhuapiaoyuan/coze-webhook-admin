import {
  Users,
  User,
  Plus,
  Key,
  Menu,
  LayoutDashboard,
  Webhook,
  Aperture,
  History,
  UserCog,
  Shield,
  FileCode,
} from "lucide-react";

export const APP_MENUS: Array<{
  id: string;
  title: string;
  items: {
    title: string;
    icon: React.JSXElementConstructor<React.SVGProps<SVGSVGElement>>;
    url: string;
    target?: string;
  }[];
}> = [
  {
    id: "biz",
    title: "接口服务",
    items: [
      {
        title: "工作台",
        icon: LayoutDashboard,
        url: "/admin/dashboard",
      },
      {
        title: "扣子Hook",
        icon: Webhook,
        url: "/admin/webhooks",
      },
      {
        title: "API服务管理",
        icon: Aperture,
        url: "/admin/api-endpoints",
      },
      {
        title: "API密钥管理",
        icon: Key,
        url: "/admin/api-keys",
      },
      {
        title: "调用日志",
        icon: History,
        url: "/admin/api-logs",
      },
    ],
  },
  {
    id: "sys",
    title: "系统设置",
    items: [
      {
        title: "管理员",
        icon: UserCog,
        url: "/admin/admins",
      },
      {
        title: "角色管理",
        icon: Users,
        url: "/admin/roles",
      },
      {
        title: "权限管理",
        icon: Shield,
        url: "/admin/permissions",
      },
      {
        title: "菜单管理",
        icon: Menu,
        url: "/admin/menus",
      },
    ],
  },
  {
    id: "dev",
    title: "开发",
    items: [
      {
        title: "接口文档",
        icon: FileCode,
        target: "_blank",
        url: "/api/swagger",
      },
    ],
  },
];

export const QuickActions = [
  {
    title: "创建COZE",
    icon: Plus,
    url: "/admin/webhooks/new",
  },
  {
    title: "个人中心",
    icon: User,
    url: "/admin/profile",
  },
];
