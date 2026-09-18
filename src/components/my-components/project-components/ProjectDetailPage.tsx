import { useParams } from "@tanstack/react-router";
import { ProjectTaskCard } from "./ProjectTaskCard";
import { useGetProjectById } from "@/hooks/useProjects";
import { ProjectEditBtn } from "./ProjectEditBtn";
import { useGetAllProjectTasks } from "@/hooks/useTasks";
import { ProjectTaskCreateBtn } from "./ProjectTaskCreateBtn";

export const ProjectDetailPage = () => {
  const { projectId } = useParams({ from: "/(dashboard)/projects/$projectId" });

  const { data: project } = useGetProjectById(projectId);
  const { data: tasks } = useGetAllProjectTasks(projectId);

  const todoTasks = tasks?.filter((task) => task.status === "todo");
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress",
  );
  const doneTasks = tasks?.filter((task) => task.status === "done");

  return (
    <main className="space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="capitalize font-semibold text-4xl">
            {project?.title}
          </h1>
          <p className="italic">{project?.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <ProjectTaskCreateBtn />
          {project && <ProjectEditBtn project={project} />}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg flex-1 shadow shadow-orange-200">
          <h1 className="mb-4 font-semibold">
            Todo ({todoTasks?.length || 0})
          </h1>
          <div className="space-y-3">
            {todoTasks?.map((task) => (
              <ProjectTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg flex-1 shadow shadow-blue-200">
          <h1 className="mb-4 font-semibold">
            In Progress ({inProgressTasks?.length || 0})
          </h1>

          <div className="space-y-3">
            {inProgressTasks?.map((task) => (
              <ProjectTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg flex-1 shadow shadow-green-200">
          <h1 className="mb-4 font-semibold">
            Done ({doneTasks?.length || 0})
          </h1>
          <div className="space-y-3">
            {doneTasks?.map((task) => (
              <ProjectTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
