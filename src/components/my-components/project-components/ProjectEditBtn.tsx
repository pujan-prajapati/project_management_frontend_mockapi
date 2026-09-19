import { Settings } from "lucide-react";
import { useState } from "react";
import { CustomDialog } from "../common-components/CustomDialog";
import { ProjectForm } from "./ProjectForm";
import { Button } from "@/components/ui/button";
import type { ProjectResponse } from "@/types/ProjectTypes";

interface ProjectEditBtnProps {
  project: ProjectResponse;
}

export const ProjectEditBtn = ({ project }: ProjectEditBtnProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  console.log("project : ", project);

  return (
    <>
      <Button
        variant={"secondary"}
        size={"xl"}
        onClick={() => setOpenDialog(true)}
      >
        <Settings />
      </Button>
      <CustomDialog
        title="Create Project"
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <ProjectForm
          project={project}
          closeDialog={() => setOpenDialog(false)}
        />
      </CustomDialog>
    </>
  );
};
