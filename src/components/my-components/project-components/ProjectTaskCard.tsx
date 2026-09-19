import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/hooks/useTasks";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CustomDialog } from "../common-components/CustomDialog";
import type { TaskResponse } from "@/types/TasksTypes";
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
import { ProjectTaskForm } from "./ProjectTaskForm";
import { cn } from "cn";

interface ProjectTaskCardProps {
  task: TaskResponse;
}

export const ProjectTaskCard = ({ task }: ProjectTaskCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { mutate, isPending } = useDeleteTask();

  const onDeleteTask = async (taskId: string) => {
    mutate(taskId, {
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
      <Card
        className={cn(
          "ring-0",
          task.status === "todo" &&
            "border-l-4 border-orange-500 shadow shadow-orange-200",
          task.status === "in_progress" &&
            "border-l-4 border-blue-500 shadow shadow-blue-200",
          task.status === "done" &&
            "border-l-4 border-green-500 shadow shadow-green-200",
        )}
      >
        <CardHeader className="flex items-center justify-between">
          <h1
            className={cn(
              "font-semibold text-lg",
              task.status === "todo" && "text-orange-800",
              task.status === "in_progress" && "text-blue-800",
              task.status === "done" && "text-green-800",
            )}
          >
            {task.title}
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant={"ghost"} />}>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                <Pen /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setOpenDeleteDialog(true)}
              >
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="space-y-1">
          <p className="text-sm text-gray-500">{task.description}</p>
          <div className="flex items-center justify-between">
            <i className="text-gray-500">{task.createdAt}</i>
            <Badge
              className={cn(
                "p-3",
                task.priority === "low" && "bg-green-100 text-green-800",
                task.priority === "medium" && "bg-yellow-100 text-yellow-800",
                task.priority === "high" && "bg-red-100 text-red-800",
              )}
            >
              {task.priority}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <CustomDialog
        title="Edit Project"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <ProjectTaskForm task={task} closeDialog={() => setOpenDialog(false)} />
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
              onClick={() => onDeleteTask(task.id)}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
