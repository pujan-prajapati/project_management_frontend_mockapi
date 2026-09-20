import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllTasks } from "@/hooks/useTasks";
import { useGetProjects } from "@/hooks/useProjects";
import { ClipboardList } from "lucide-react";
import { cn } from "cn";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const DashboardRecentTaskCard = () => {
  const {
    data: tasks,
    isPending: isTasksPending,
    isError: isTasksError,
  } = useGetAllTasks();
  const {
    data: projects,
    isPending: isProjectsPending,
    isError: isProjectsError,
  } = useGetProjects();

  const latestTasks = [...(tasks ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  if (isTasksPending || isProjectsPending) {
    return <p>Loading...</p>;
  }

  if (isTasksError || isProjectsError) {
    return <p>Error loading recent tasks</p>;
  }

  return (
    <>
      {latestTasks.map((task) => {
        const project = projects?.find(
          (project) => project.id === task.projectId,
        );

        return (
          <Card
            key={task.id}
            className={cn(
              "ring-0",
              task.status === "todo" &&
                "border-l-4 border-orange-500 shadow shadow-orange-200",
              task.status === "in_progress" &&
                "border-l-4 border-blue-500 shadow shadow-blue-200",
              task.status === "done" &&
                "border-l-4 border-green-500 shadow shadow-green-200",
            )}
          >
            <CardContent className="flex items-center gap-4">
              <ClipboardList />

              <div className="flex-1">
                <p className="text-sm text-gray-500">{project?.title}</p>

                <h3 className="font-semibold">{task.title}</h3>

                <div className="flex items-center justify-between">
                  <i className="text-sm text-gray-500">{task.createdAt}</i>

                  <Badge
                    className={cn(
                      task.status === "todo" && "bg-orange-100 text-orange-800",
                      task.status === "in_progress" &&
                        "bg-blue-100 text-blue-800",
                      task.status === "done" && "bg-green-100 text-green-800",
                    )}
                  >
                    {task.status === "in_progress"
                      ? "In Progress"
                      : task.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {latestTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <img src="https://imgs.search.brave.com/EodM7QWWD954TGbq7DnxaqoNRSYajnx0sLoJDk9wZb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzIv/MzEwLzE1Ni9zbWFs/bC90YXNrLWxpc3Qt/b2Ytd29yay1pbGx1/c3RyYXRpb24tdmVj/dG9yLmpwZw" />
          <p>No recent tasks found. Please create a task.</p>
        </div>
      )}

      {latestTasks.length > 0 && (
        <Link to="/task" className="float-end">
          <Button variant={"link"} className={"italic text-neutral-700"}>
            View all tasks
          </Button>
        </Link>
      )}
    </>
  );
};
