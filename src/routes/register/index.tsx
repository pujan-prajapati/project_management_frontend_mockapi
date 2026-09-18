import { RegisterPage } from "@/components/my-components/register-components/RegisterPage";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/register/")({
  beforeLoad: async () => {
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      throw redirect({ to: "/" });
    }
  },
  component: RegisterPage,
});
