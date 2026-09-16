import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomDialog } from "../CustomDialog";

export const ProjectCreateBtn = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <SidebarGroupAction
        className="cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <Plus />
      </SidebarGroupAction>
      <CustomDialog
        title="Create Task"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        create project
      </CustomDialog>
    </>
  );
};
