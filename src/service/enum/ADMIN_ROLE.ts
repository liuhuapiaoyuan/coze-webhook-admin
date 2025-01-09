export enum ADMIN_ROLE {
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export const ADMIN_ROLE_NAME: Record<ADMIN_ROLE, string> = {
  [ADMIN_ROLE.ADMIN]: "管理员",
  [ADMIN_ROLE.SUPERADMIN]: "超级管理员",
};
