import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  onUpload?: (file: File) => Promise<void>;
  isUploading?: boolean;
  previewClassName?: string;
  containerClassName?: string;
}

export function ImageUpload({
  value,
  onChange,
  onUpload,
  isUploading,
  previewClassName = "w-full h-64",
  containerClassName = "space-y-4",
}: ImageUploadProps) {
  return (
    <div className={containerClassName}>
      <div className="flex w-full items-center justify-center">
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-gray-50",
            previewClassName
          )}
        >
          {value ? (
            <div className="relative h-full w-full">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object rounded-lg object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <UploadCloud className="mb-4 h-8 w-8 text-gray-500" />

              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">点击上传</span> 或拖拽图片到此处
              </p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onUpload?.(file);
              }
            }}
            disabled={isUploading}
          />
        </label>
      </div>
      {value && (
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange?.("")}
          className="w-full"
        >
          移除图片
        </Button>
      )}
    </div>
  );
}
