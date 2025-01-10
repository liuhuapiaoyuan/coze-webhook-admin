import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export interface RemoveButtonProps {
  /**
   * 删除操作的文本
   */
  deleteText?: string;
  /**
   * 提示文本
   */
  description?: string;
  /**
   * 点击删除按钮时的回调函数
   */
  onDeleteAction: () => void;
}

export function RemoveButton(props: RemoveButtonProps) {
  const {
    deleteText = "删除",
    description = "此操作无法撤销，确定要删除吗？",
    onDeleteAction,
  } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full justify-start  text-red-400" variant="ghost">
          <Trash2 className="mr-2 h-4 w-4" />
          {deleteText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确认删除</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteAction}>
            {deleteText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
