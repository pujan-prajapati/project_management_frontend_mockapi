import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../commom-components/AppSidebar";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../commom-components/Navbar";

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-svh">
        <Navbar />

        <div className="flex flex-1 ">
          <div className="flex-1 p-4 lg:p-8">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
