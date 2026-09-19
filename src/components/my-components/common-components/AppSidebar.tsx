import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../../ui/sidebar";
import { Button } from "../../ui/button";
import { FolderKanban, LayoutDashboard, ListTodo } from "lucide-react";
import { ProjectCreateBtn } from "../project-components/ProjectCreateBtn";
import { useGetProjects } from "@/hooks/useProjects";

export const AppSidebar = () => {
  const { data } = useGetProjects();

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link
            to="/"
            className="text-center text-3xl font-bold text-neutral-700"
          >
            Task<span className="text-green-500">Flow</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="bg-white p-2">
          <Link to="/">
            <Button className="w-full h-14 text-xl mb-2">
              <LayoutDashboard className="w-5! h-5!" /> Dashboard
            </Button>
          </Link>

          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <ProjectCreateBtn />
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {data?.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <Link
                      to="/projects/$projectId"
                      params={{ projectId: project.id }}
                      className="capitalize flex items-center gap-2 rounded-lg p-2 transition duration-200 font-semibold hover:bg-green-50 hover:text-green-900 [&.active]:bg-green-600 [&.active]:text-white"
                    >
                      <FolderKanban size={18} /> {project.title}
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link
                to="/task"
                className="capitalize flex items-center gap-2 rounded-lg p-2 transition duration-200 font-semibold hover:bg-green-50 hover:text-green-900 [&.active]:bg-green-600 [&.active]:text-white"
              >
                <ListTodo size={18} /> Tasks
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
