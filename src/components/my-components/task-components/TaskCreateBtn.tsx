import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomDialog } from "../commom-components/CustomDialog";
import { useState } from "react";
import { ProjectTaskForm } from "../project-components/ProjectTaskForm";

export const TaskCreateBtn = () => {
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
