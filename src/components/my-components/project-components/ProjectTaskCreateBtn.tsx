import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomDialog } from "../common-components/CustomDialog";
import { useState } from "react";
import { ProjectTaskForm } from "./ProjectTaskForm";

export const ProjectTaskCreateBtn = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Button size={"xl"} onClick={() => setOpenDialog(true)}>
        <Plus /> Create Task
      </Button>
      <CustomDialog
        title="Create Task"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <ProjectTaskForm closeDialog={() => setOpenDialog(false)} />
      </CustomDialog>
    </div>
  );
};
