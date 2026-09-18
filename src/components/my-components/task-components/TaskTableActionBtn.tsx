import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { CustomDialog } from "../commom-components/CustomDialog";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import type { TaskResponse } from "@/types/TasksTypes";
import { useDeleteTask } from "@/hooks/useTasks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

interface TaskTableActionBtnProps {
  task: TaskResponse;
}

export const TaskTableActionBtn = ({ task }: TaskTableActionBtnProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutate: deleteMutate, isPending } = useDeleteTask();

  const handleDeleteTask = (taskId: string) => {
    deleteMutate(taskId, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        setOpenDeleteDialog(false);
      },
      onError: () => {
        toast.error("Error deleting task");
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant={"ghost"} />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={"cursor-pointer"}
              onClick={() => setOpenEditDialog(true)}
            >
              <Pen /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className={"cursor-pointer"}
              onClick={() => setOpenDeleteDialog(true)}
            >
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomDialog
        title="Edit Task"
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      >
        <TaskForm task={task} closeDialog={() => setOpenEditDialog(false)} />
      </CustomDialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => handleDeleteTask(task.id)}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
