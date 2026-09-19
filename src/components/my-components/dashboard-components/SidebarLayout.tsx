import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../common-components/AppSidebar";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../common-components/Navbar";

export const SidebarLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-svh">
        <Navbar />

        <div className="flex flex-col p-4 lg:p-8 flex-1 ">
          <div className="flex-1 ">
            <Outlet />
          </div>

          <footer className="mt-8 text-center text-sm text-gray-500 shadow p-4 rounded-lg bg-gray-50">
            &copy; 2026 Pujan Prajapati. All rights reserved.
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
