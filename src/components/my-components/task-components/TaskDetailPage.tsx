import { DataTable } from "@/components/my-components/common-components/data-table";
import { TaskCreateBtn } from "@/components/my-components/task-components/TaskCreateBtn";
import { createTaskColumns } from "@/components/my-components/task-components/TaskColumn";
import { useGetProjects } from "@/hooks/useProjects";
import { useGetAllTasks } from "@/hooks/useTasks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TaskPage = () => {
  const { data: tasks } = useGetAllTasks();
  const { data: projects } = useGetProjects();

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Task</h1>

        <TaskCreateBtn />
      </div>

      {/* table */}
      <div className="space-y-4">
        {tasks?.length === 0 ? (
          <div className="text-center text-gray-500">
            No tasks found. Please create a task.
          </div>
        ) : (
          <DataTable
            columns={createTaskColumns(projects || [])}
            data={tasks || []}
            toolbar={(table) => (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Filter title..."
                  value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(e) =>
                    table.getColumn("title")?.setFilterValue(e.target.value)
                  }
                  className="max-w-sm h-10"
                />

                <Select
                  value={
                    (table.getColumn("status")?.getFilterValue() as string) ??
                    "all"
                  }
                  onValueChange={(value) =>
                    table
                      .getColumn("status")
                      ?.setFilterValue(value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger className="w-40" aria-label="Filter by status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={
                    (table.getColumn("priority")?.getFilterValue() as string) ??
                    "all"
                  }
                  onValueChange={(value) =>
                    table
                      .getColumn("priority")
                      ?.setFilterValue(value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger
                    className="w-40"
                    aria-label="Filter by priority"
                  >
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        )}
      </div>
    </section>
  );
};
