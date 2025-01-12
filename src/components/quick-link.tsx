"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { search } from "text-search-engine";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { APP_MENUS, QuickActions } from "../const/app-actions";
import { useRouter } from "next/navigation";

export function QuickLink() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="flex cursor-pointer items-center space-x-2 rounded-md border px-3 py-1 hover:bg-muted/50"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="flex w-full bg-transparent py-0.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
          ⌘J 快捷执行...
        </span>
      </div>
      <CommandDialog
        filter={(value: string, searchKey: string) => {
          const results = search(value, searchKey);
          if ((results?.length ?? 0) > 0) return 1;
          return 0;
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="输入功能快速检索" />
        <CommandList>
          <CommandEmpty>无匹配结果.</CommandEmpty>
          {APP_MENUS.map((group) => {
            return (
              <React.Fragment key={group.id}>
                <CommandGroup heading={group.title}>
                  {group.items.map((action) => {
                    return (
                      <CommandItem
                        key={action.url}
                        onSelect={() => {
                          router.push(action.url);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <action.icon />
                        <span>{action.title}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            );
          })}
          {QuickActions.map((action) => {
            return (
              <CommandItem
                onSelect={() => {
                  router.push(action.url);
                  setOpen(false);
                }}
                className="cursor-pointer"
                key={action.url}
              >
                <action.icon />
                <span>{action.title}</span>
              </CommandItem>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
