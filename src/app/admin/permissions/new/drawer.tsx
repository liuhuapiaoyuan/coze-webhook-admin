"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PermissionForm } from "../_components/permission-form";

export function PermissionsDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">新建权限</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="w-full max-w-sm">
          <SheetHeader>
            <SheetTitle>新建权限</SheetTitle>
            <SheetDescription>创建一个新的权限</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <PermissionForm />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
