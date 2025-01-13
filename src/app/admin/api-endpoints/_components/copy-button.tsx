"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  value: string;
  className?: string;
  toastTitle?: string;
  toastDescription?: string;
}

export function CopyButton({
  value,
  className,
  toastTitle = "已复制",
  toastDescription = "内容已复制到剪贴板",
}: CopyButtonProps) {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    toast({
      title: toastTitle,
      description: toastDescription,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={className}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
}
