import { DataTable } from "@/components/my-components/commom-components/data-table";
import { TaskColumn } from "@/components/my-components/task-components/TaskColumn";
import { TaskCreateBtn } from "@/components/my-components/task-components/TaskCreateBtn";
import { TaskDto } from "@/dto/Tasks.dto";

export const TaskPage = () => {
  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Task</h1>

        <TaskCreateBtn />
      </div>

      {/* table */}
      <div className="space-y-4">
        <DataTable columns={TaskColumn} data={TaskDto} />
      </div>
    </section>
  );
};
