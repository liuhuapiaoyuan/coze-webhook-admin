"use client";

import { Permission } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchPermissions } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PermissionSelectProps {
  value: string | null;
  defaultValue?: string | null;
  onChange: (value: string | null) => void;
}

export function PermissionSelect({
  value,
  defaultValue,
  onChange,
}: PermissionSelectProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const loadPermissions = async () => {
      const data = await fetchPermissions();
      setPermissions(data);
    };
    loadPermissions();
  }, []);

  return (
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue ?? undefined}
      value={value ?? undefined}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="选择父权限" />
      </SelectTrigger>
      <SelectContent>
        {permissions.map((perm) => (
          <SelectItem key={perm.id} value={perm.id}>
            {perm.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
