import { TaskPage } from "@/components/my-components/task-components/TaskDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/task/")({
  component: TaskPage,
});
