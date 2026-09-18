import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "../../ui/sidebar";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "@tanstack/react-router";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("fullName");
    navigate({ to: "/register" });
  };

  return (
    <div className="flex items-center justify-between p-5 bg-gray-50">
      <SidebarTrigger />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar size="lg" className={"cursor-pointer rounded-lg"}>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className={"rounded-lg"}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
