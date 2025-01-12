"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MenuItem } from "@/const/APP_MENUS";
import { getIconComponent } from "@/const/ICONS";
export const systemColumns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "parentId",
    header: "上级",
  },
  {
    accessorKey: "id",
    header: "序号",
  },
  {
    accessorKey: "icon",
    header: "图标",
    cell: ({ row }) => {
      const Icon = getIconComponent(row.original.icon);
      return (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="size-4 " />}
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: "url",
    header: "URL",
  },
];
