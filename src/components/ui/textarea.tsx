import * as React from "react";

import { cn } from "@/lib/utils";
import { generateJSON } from "@/service/coze.service";
import { z } from "zod";
import { Button } from "./button";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    prompt?: string;
    onPromptResult?: (content: string) => void;
  }
>(({ className, onPromptResult, prompt, ...props }, ref) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div
      className={cn(
        "group flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm  placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
    >
      <textarea
        className={cn(
          "flex min-h-[60px] w-full   bg-transparent   text-base   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />

      {prompt && (
        <Button
          disabled={loading}
          type="button"
          onClick={() => {
            setLoading(true);
            generateJSON(
              prompt,
              z.object({
                content: z.string().describe("重新生成的文本"),
              })
            )
              .then((result) => {
                onPromptResult?.(result.content);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? "生成中..." : "AI一下"}
        </Button>
      )}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
