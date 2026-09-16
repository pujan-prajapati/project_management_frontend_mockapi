import { SidebarLayout } from "@/components/my-components/dashboard-components/SidebarLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)")({
  component: SidebarLayout,
});
