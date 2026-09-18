import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormField } from "../commom-components/CustomFormField";
import { Button } from "@/components/ui/button";
import { taskFormSchema } from "@/schema/TaskFormSchema";
import type { TaskResponse } from "@/types/TasksTypes";
import { useGetProjects } from "@/hooks/useProjects";
import { useCreateTask, useEditTask } from "@/hooks/useTasks";
import { toast } from "react-toastify";

interface TaskFormProps {
  closeDialog: () => void;
  task?: TaskResponse;
}

export const TaskForm = ({ closeDialog, task }: TaskFormProps) => {
  const isEditMode = !!task;

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "todo",
      priority: task?.priority ?? "medium",
      projectId: task?.projectId ?? "",
    },
  });

  const { data: projects } = useGetProjects();
  const { mutate: createMutate, isPending: createPending } = useCreateTask();
  const { mutate: editMutate, isPending: editPending } = useEditTask(
    task?.projectId ?? "",
  );
  const isPending = isEditMode ? editPending : createPending;

  const onSubmit = (data: z.infer<typeof taskFormSchema>) => {
    if (isEditMode && task) {
      editMutate(
        { taskId: task.id, formData: data },
        {
          onSuccess: () => {
            toast.success("Task updated successfully");
            closeDialog();
          },
          onError: () => {
            toast.error("Error updating task");
          },
        },
      );
    } else {
      const createdAt = new Date().toISOString().split("T")[0];
      const newTask = { ...data, createdAt };
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
          disabled={isPending}
          required
        />

        {/* status */}
        <CustomFormField
          control={form.control}
          name="status"
          disabled={isPending}
          label="Status"
          type="select"
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
          disabled={isPending}
          label="Priority"
          type="select"
          options={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
        />

        {/* project */}
        <CustomFormField
          control={form.control}
          name="projectId"
          label="Project"
          disabled={isPending}
          type="select"
          options={
            projects?.map((project) => ({
              label: project.title,
              value: project.id,
            })) ?? []
          }
          required
        />

        <div className="flex justify-end">
          <Button type="submit" size="lg">
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
