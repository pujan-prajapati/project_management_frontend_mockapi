import { DataTable } from "@/components/my-components/commom-components/data-table";
import { TaskCreateBtn } from "@/components/my-components/task-components/TaskCreateBtn";
import { createTaskColumns } from "@/components/my-components/task-components/TaskColumn";
import { useGetProjects } from "@/hooks/useProjects";
import { useGetAllTasks } from "@/hooks/useTasks";

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
          />
        )}
      </div>
    </section>
  );
};
