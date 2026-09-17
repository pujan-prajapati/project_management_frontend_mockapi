import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomDialog } from "../commom-components/CustomDialog";
import { useState } from "react";

export const TaskCreateBtn = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <Button
        size={"xl"}
        className={"bg-green-600"}
        onClick={() => setOpenDialog(true)}
      >
        <Plus /> Create Task
      </Button>
      <CustomDialog
        title="Create Task"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        create task
      </CustomDialog>
    </div>
  );
};
