import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

export const permissionFormSchema = z.object({
  name: z.string().min(1, "权限名称不能为空"),
  key: z.string().min(1, "权限键不能为空"),
  description: z.string().optional().nullable(),
  parentId: z.string().nullable(), // 新增的字段
});

export type PermissionFormValues = z.infer<typeof permissionFormSchema>;

export const permissionResolver = zodResolver(permissionFormSchema);
