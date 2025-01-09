import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserBarProps {
  email: string;
  username: string;
  avatarUrl?: string;
  className?: string;
}

const UserBar = React.forwardRef<HTMLDivElement, UserBarProps>(
  ({ email, username, avatarUrl, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center space-x-4 rounded-lg bg-background p-2 shadow",
          "hover:bg-muted",
          className
        )}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {username}
          </span>
          <div className="text-xs text-muted-foreground">{email}</div>
        </div>
      </div>
    );
  }
);

UserBar.displayName = "UserBar";

export { UserBar };
