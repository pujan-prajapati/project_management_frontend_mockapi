import { TaskPage } from "@/pages/task.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/task/")({
  component: TaskPage,
});
