import { createColumnHelper } from "@tanstack/react-table";
import type { TaskResponse } from "@/types/TasksTypes";
import type { ProjectResponse } from "@/types/ProjectTypes";
import type { DataTableFeatures } from "../commom-components/data-table-features";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskTableActionBtn } from "./TaskTableActionBtn";

const columnHelper = createColumnHelper<DataTableFeatures, TaskResponse>();

export const createTaskColumns = (projects: ProjectResponse[] = []) =>
  columnHelper.columns([
    columnHelper.accessor("title", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    }),
    columnHelper.accessor("projectId", {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Projects
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const projectId = row.getValue("projectId") as string;
        return (
          projects.find((project) => project.id === projectId)?.title ??
          projectId
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        return (
          <Badge
            className={cn(
              "capitalize font-semibold",
              status === "todo" && "border-l-4 bg-orange-500",
              status === "in_progress" && "border-l-4 bg-blue-500",
              status === "done" && "border-l-4 bg-green-500",
            )}
          >
            {status.replace("-", " ")}
          </Badge>
        );
      },
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as "low" | "medium" | "high";

        const priorityStyles = {
          low: "bg-green-100 text-green-700 hover:bg-green-100",
          medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
          high: "bg-red-100 text-red-700 hover:bg-red-100",
        };

        return (
          <Badge className={cn("capitalize", priorityStyles[priority])}>
            {priority}
          </Badge>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const tasks = row.original as TaskResponse;
        return <TaskTableActionBtn task={tasks} />;
      },
    }),
  ]);
