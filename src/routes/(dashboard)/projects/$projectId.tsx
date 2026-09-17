import { ProjectDetailPage } from "@/components/my-components/project-components/ProjectDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/projects/$projectId")({
  component: ProjectDetailPage,
});
