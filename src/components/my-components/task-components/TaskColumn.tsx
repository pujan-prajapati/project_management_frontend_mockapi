import { createColumnHelper } from "@tanstack/react-table";
import type { Tasks } from "@/types/Tasks.types";
import type { DataTableFeatures } from "../commom-components/data-table-features";
import { Badge } from "@/components/ui/badge";
import { cn } from "cn";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskTableActionBtn } from "./TaskTableActionBtn";

const columnHelper = createColumnHelper<DataTableFeatures, Tasks>();

export const TaskColumn = columnHelper.columns([
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
  columnHelper.accessor("project", {
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
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          className={cn(
            "capitalize",
            status === "todo" && "bg-gray-100 text-gray-700 hover:bg-gray-100",
            status === "in-progress" &&
              "bg-blue-100 text-blue-700 hover:bg-blue-100",
            status === "completed" &&
              "bg-green-100 text-green-700 hover:bg-green-100",
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
  columnHelper.accessor("dueDate", {
    header: "DueDate",
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => {
      return <TaskTableActionBtn />;
    },
  }),
]);
