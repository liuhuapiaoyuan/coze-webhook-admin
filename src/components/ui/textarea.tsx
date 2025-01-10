import * as React from "react";

import { cn } from "@/lib/utils";

type ExtendsTextAreaProps = {
  autoHeight?: boolean;
};

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & ExtendsTextAreaProps
>(({ className, autoHeight, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoHeight && textareaRef.current) {
      const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };

      adjustHeight();
      textareaRef.current.addEventListener("input", adjustHeight);

      return () => {
        if (textareaRef.current) {
          textareaRef.current.removeEventListener("input", adjustHeight);
        }
      };
    }
  }, [autoHeight]);

  return (
    <div
      className={cn(
        "group flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      <textarea
        className={cn(
          "flex min-h-[60px] w-full bg-transparent text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          autoHeight && "resize-none overflow-hidden",
          className
        )}
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          textareaRef.current = node;
        }}
        {...props}
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
