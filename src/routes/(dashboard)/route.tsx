import { SidebarLayout } from "@/components/my-components/dashboard-components/SidebarLayout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)")({
  beforeLoad: async () => {
    const fullName = localStorage.getItem("fullName");
    if (!fullName) {
      throw redirect({ to: "/register" });
    }
  },
  component: SidebarLayout,
});
