import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormField } from "../common-components/CustomFormField";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useParams } from "@tanstack/react-router";
import { useCreateTask, useEditTask } from "@/hooks/useTasks";
import type { TaskResponse } from "@/types/TasksTypes";
import { projectTaskFormSchema } from "@/schema/ProjectFormSchema";

interface ProjectTaskFormProps {
  closeDialog: () => void;
  task?: TaskResponse;
}

export const ProjectTaskForm = ({
  closeDialog,
  task,
}: ProjectTaskFormProps) => {
  const { projectId } = useParams({ from: "/(dashboard)/projects/$projectId" });
  const isEditMode = !!task;

  const form = useForm<z.infer<typeof projectTaskFormSchema>>({
    resolver: zodResolver(projectTaskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "todo",
      priority: task?.priority ?? "medium",
    },
  });

  const { mutate: createMutate, isPending: createPending } =
    useCreateTask(projectId);
  const { mutate: editMutate, isPending: editPending } = useEditTask(projectId);
  const isPending = isEditMode ? editPending : createPending;

  const onSubmit = (data: z.infer<typeof projectTaskFormSchema>) => {
    if (isEditMode) {
      editMutate(
        { taskId: task.id, formData: { ...data, projectId } },
        {
          onSuccess: () => {
            toast.success("Task updated successfully");
            form.reset();
            closeDialog();
          },
          onError: () => {
            toast.error("Error updating task");
          },
        },
      );
    } else {
      const createdAt = new Date().toISOString().split("T")[0];
      const newTask = { ...data, createdAt, projectId };
      createMutate(newTask, {
        onSuccess: () => {
          toast.success("Task created successfully");
          form.reset();
          closeDialog();
        },
        onError: () => {
          toast.error("Error creating task");
        },
      });
    }
  };

  return (
    <form id="tasks-form" onSubmit={form.handleSubmit(onSubmit)}>
      {/* title */}
      <FieldGroup>
        <CustomFormField
          control={form.control}
          name="title"
          label="Title"
          disabled={isPending}
          required
        />

        {/* description */}
        <CustomFormField
          control={form.control}
          name="description"
          label="Description"
          required
          disabled={isPending}
        />

        {/* status */}
        <CustomFormField
          control={form.control}
          name="status"
          label="Status"
          type="select"
          disabled={isPending}
          options={[
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in_progress" },
            { label: "Done", value: "done" },
          ]}
        />

        {/* priority */}
        <CustomFormField
          control={form.control}
          name="priority"
          label="Priority"
          disabled={isPending}
          type="select"
          options={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
        />

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update"
                : "Create"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
