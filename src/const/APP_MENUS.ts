export type MenuItem = {
  id: string;
  name: string;
  parentId: string | null;
  icon: string | null;
  url: string | null;
  target?: string;
};

export const APP_MENUS: MenuItem[] = [
  {
    id: "biz",
    name: "接口服务",
    parentId: null,
    icon: "User",
    url: null,
  },
  {
    id: "dashboard",
    name: "工作台",
    parentId: "biz",
    icon: "LayoutDashboard",
    url: "/admin/dashboard",
  },
  {
    id: "webhooks",
    name: "扣子Hook",
    parentId: "biz",
    icon: "Webhook",
    url: "/admin/webhooks",
  },
  {
    id: "api-endpoints",
    name: "API服务管理",
    parentId: "biz",
    icon: "Aperture",
    url: "/admin/api-endpoints",
  },
  {
    id: "api-keys",
    name: "API密钥管理",
    parentId: "biz",
    icon: "Key",
    url: "/admin/api-keys",
  },
  {
    id: "api-logs",
    name: "调用日志",
    parentId: "biz",
    icon: "History",
    url: "/admin/api-logs",
  },
  {
    id: "sys",
    name: "系统设置",
    parentId: null,
    icon: null,
    url: null,
  },
  {
    id: "admins",
    name: "管理员",
    parentId: "sys",
    icon: "UserCog",
    url: "/admin/admins",
  },
  {
    id: "roles",
    name: "角色管理",
    parentId: "sys",
    icon: "Users",
    url: "/admin/roles",
  },
  {
    id: "permissions",
    name: "权限管理",
    parentId: "sys",
    icon: "Shield",
    url: "/admin/permissions",
  },
  {
    id: "menus",
    name: "菜单管理",
    parentId: "sys",
    icon: "Menu",
    url: "/admin/menus",
  },
  {
    id: "dev",
    name: "开发",
    parentId: null,
    icon: null,
    url: null,
  },
  {
    id: "api-docs",
    name: "接口文档",
    parentId: "dev",
    icon: "FileCode",
    url: "/api/swagger",
    target: "_blank",
  },
];
