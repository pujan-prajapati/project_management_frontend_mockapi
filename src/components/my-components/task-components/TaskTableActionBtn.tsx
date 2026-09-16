import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { CustomDialog } from "../CustomDialog";
import { useState } from "react";

export const TaskTableActionBtn = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
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
        title="Create Task"
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      >
        Edit task
      </CustomDialog>

      <CustomDialog
        title="Delete task"
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      >
        Are you sure you want to delete this task? This action cannot be undone.
      </CustomDialog>
    </>
  );
};
