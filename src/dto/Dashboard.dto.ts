import type {
  DashbaordTypes,
  DashboardRecentActivityTypes,
  DashboardRecentTaskTypes,
} from "@/types/Dashboard.types";
import { Check, ClipboardList, Logs } from "lucide-react";

export const DashboardDto: DashbaordTypes[] = [
  {
    id: 1,
    title: "Total Projects",
    count: 6,
    Icon: Logs,
  },

  {
    id: 2,
    title: "Total Tasks",
    count: 36,
    Icon: ClipboardList,
  },

  {
    id: 3,
    title: "Completed",
    count: 18,
    Icon: Check,
  },
];

export const DashboardRecentActivityDto: DashboardRecentActivityTypes[] = [
  {
    id: 1,
    name: "TaskFlow Dashboard",
    description: "Build the main project management dashboard",
    status: "active",
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Create a personal developer portfolio",
    status: "completed",
    updatedAt: "Yesterday",
  },
  {
    id: 3,
    name: "E-Commerce App",
    description: "Develop product listing and shopping features",
    status: "active",
    updatedAt: "2 days ago",
  },

  {
    id: 4,
    name: "E-Commerce App",
    description: "Develop product listing and shopping features",
    status: "active",
    updatedAt: "2 days ago",
  },
];

export const DashboardRecentTaskDto: DashboardRecentTaskTypes[] = [
  {
    id: 1,
    title: "Design dashboard layout",
    project: "TaskFlow",
    status: "in-progress",
    priority: "high",
    updatedAt: "10 minutes ago",
  },
  {
    id: 2,
    title: "Create authentication page",
    project: "TaskFlow",
    status: "todo",
    priority: "high",
    updatedAt: "1 hour ago",
  },
  {
    id: 3,
    title: "Build project card component",
    project: "TaskFlow",
    status: "completed",
    priority: "medium",
    updatedAt: "Yesterday",
  },
  {
    id: 4,
    title: "Add responsive navigation",
    project: "Portfolio Website",
    status: "in-progress",
    priority: "medium",
    updatedAt: "Yesterday",
  },
];
