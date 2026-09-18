import type { LucideIcon } from "lucide-react";

export type DashbaordTypes = {
  id: number;
  title: string;
  count: number;
  Icon: LucideIcon;
};

export type DashboardRecentActivityTypes = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  updatedAt: string;
};

export type DashboardRecentTaskTypes = {
  id: number;
  title: string;
  project: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  updatedAt: string;
};
