import {
  AudioLines,
  Calendar,
  FolderXIcon,
  Home,
  SquareUserRound,
  Inbox,
  Martini,
  PersonStanding,
  Plus,
  Lock,
  User2Icon,
  Menu,
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
    title: "数字人系统",
    items: [
      {
        title: "工作台",
        icon: Home,
        url: "/dashboard",
      },
      {
        title: "数字人市场",
        icon: Calendar,
        url: "/digital-humans",
      },
      {
        title: "设备",
        icon: Inbox,
        url: "/devices",
      },
      {
        title: "用户",
        icon: User2Icon,
        url: "/users",
      },
      {
        title: "营销",
        icon: Martini,
        url: "/marketing/sign-in-rules",
      },
      {
        title: "语音管理",
        icon: AudioLines,
        url: "/voices",
      },
    ],
  },
  {
    id: "sys",
    title: "系统设置",
    items: [
      {
        title: "管理员",
        icon: PersonStanding,
        url: "/admins",
      },
      {
        title: "角色管理",
        icon: SquareUserRound,
        url: "/roles",
      },
      {
        title: "权限管理",
        icon: Lock,
        url: "/permissions",
      },
      {
        title: "菜单管理",
        icon: Menu,
        url: "/menus",
      },
    ],
  },
  {
    id: "dev",
    title: "开发",
    items: [
      {
        title: "接口文档",
        icon: FolderXIcon,
        target: "_blank",
        url: "/api/swagger",
      },
    ],
  },
];

export const QuickActions = [
  {
    title: "创建数字人",
    icon: Plus,
    url: "/digital-humans/create",
  },
  {
    title: "个人中心",
    icon: PersonStanding,
    url: "/profile",
  },
];
