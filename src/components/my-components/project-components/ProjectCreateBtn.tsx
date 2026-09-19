import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CustomDialog } from "../common-components/CustomDialog";
import { ProjectForm } from "./ProjectForm";

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
        title="Create Project"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <ProjectForm closeDialog={() => setOpenDialog(false)} />
      </CustomDialog>
    </>
  );
};
