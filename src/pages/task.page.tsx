import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/my-components/data-table";
import { TaskColumn } from "@/components/my-components/task-components/TaskColumn";
import { TaskDto } from "@/dto/Tasks.dto";

export const TaskPage = () => {
  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold">Task</h1>

        <Button size={"xl"} className={"bg-green-600"}>
          <Plus /> Create Task
        </Button>
      </div>

      {/* table */}
      <div className="space-y-4">
        <DataTable columns={TaskColumn} data={TaskDto} />
      </div>
    </section>
  );
};
