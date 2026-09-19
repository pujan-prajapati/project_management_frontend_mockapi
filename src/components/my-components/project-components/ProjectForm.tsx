import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormField } from "../common-components/CustomFormField";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { projectFormSchema } from "@/schema/ProjectFormSchema";
import type { ProjectResponse } from "@/types/ProjectTypes";
import {
  useCreateProject,
  useDeleteProject,
  useEditProject,
} from "@/hooks/useProjects";
import { Trash2 } from "lucide-react";
import { cn } from "cn";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "@tanstack/react-router";

interface ProjectFormProps {
  project?: ProjectResponse;
  closeDialog: () => void;
}

export const ProjectForm = ({ project, closeDialog }: ProjectFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!project;

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
    },
  });

  const { mutate: createMutate, isPending: createPending } = useCreateProject();
  const { mutate: editMutate, isPending: editPending } = useEditProject(
    project?.id ?? "",
  );
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteProject();
  const isPending = createPending || editPending || deletePending;

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    if (isEditMode) {
      editMutate(
        { formData: data },
        {
          onSuccess: () => {
            toast.success("Project updated successfully!");
            form.reset();
            closeDialog();
          },
          onError: () => {
            toast.error("Error updating project.");
          },
        },
      );
    } else {
      const createdAt = new Date().toISOString().split("T")[0];
      const newProject = { ...data, createdAt };
      createMutate(newProject, {
        onSuccess: (createdProject) => {
          toast.success("Project created successfully!");
          form.reset();
          closeDialog();

          navigate({
            to: "/projects/$projectId",
            params: { projectId: createdProject.id },
          });
        },
        onError: () => {
          toast.error("Error creating project.");
        },
      });
    }
  };

  const handleDelete = () => {
    deleteMutate(project?.id ?? "", {
      onSuccess: () => {
        toast.success("Project deleted successfully!");
        navigate({
          to: "/",
        });
      },
      onError: () => {
        toast.error("Error deleting project.");
      },
    });
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <CustomFormField
          control={form.control}
          name="title"
          label="Title"
          disabled={isPending}
          required
        />
        <CustomFormField
          control={form.control}
          name="description"
          label="Description"
          disabled={isPending}
          required
        />
      </FieldGroup>

      <div
        className={cn(
          "mt-4 flex items-center gap-2",
          isEditMode ? "justify-between" : "justify-end",
        )}
      >
        {isEditMode && (
          <Popover>
            <PopoverTrigger render={<Button variant="destructive" />}>
              <Trash2 />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverDescription>
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </PopoverDescription>
              </PopoverHeader>
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  type="button"
                  disabled={isPending}
                  onClick={handleDelete}
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
        <Button size={"lg"} type="submit" disabled={isPending}>
          {isPending
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
              ? "Update"
              : "Create"}
        </Button>
      </div>
    </form>
  );
};
