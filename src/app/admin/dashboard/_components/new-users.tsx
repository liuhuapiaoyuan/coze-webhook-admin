"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";

interface NewUsersProps {
  users: User[];
}

export function NewUsers({ users }: NewUsersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>今日新增用户</CardTitle>
        <CardDescription>今天新注册的用户列表</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            今天还没有新用户注册
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <Avatar>
                <AvatarImage src={user.avatar ?? ""} />
                <AvatarFallback className="bg-primary/10">
                  {user.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(user.createdAt, {
                  addSuffix: true,
                  locale: zhCN,
                })}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
