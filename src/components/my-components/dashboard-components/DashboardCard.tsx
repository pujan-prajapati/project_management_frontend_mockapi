import { Card, CardContent } from "@/components/ui/card";
import { useGetProjects } from "@/hooks/useProjects";
import { Check, ClipboardList, Logs } from "lucide-react";
import { useGetAllTasks } from "@/hooks/useTasks";

export const DashboardCard = () => {
  const { data: projects } = useGetProjects();
  const { data: tasks } = useGetAllTasks();

  const completedTasks =
    tasks?.filter((task) => task.status === "done").length || 0;

  const cards = [
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: Logs,
      color: "orange",
    },
    {
      title: "Total Tasks",
      value: tasks?.length || 0,
      icon: ClipboardList,
      color: "purple",
    },
    {
      title: "Total Completed",
      value: completedTasks,
      icon: Check,
      color: "green",
    },
  ];

  return (
    <>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className={`ring-gray-200 shadow shadow-${card.color}-400`}
          >
            <CardContent className="flex items-center justify-between">
              <div className="space-y-2">
                <Icon
                  className={`rounded-full bg-${card.color}-800 p-2 text-white`}
                  size={38}
                />

                <h2 className={`text-xl font-semibold text-${card.color}-800`}>
                  {card.title}
                </h2>
              </div>

              <h1
                aria-label={`${card.title} count`}
                className={`text-4xl font-bold text-${card.color}-800`}
              >
                {card.value}
              </h1>
            </CardContent>
          </Card>
        );
      })}

      {/* Image card */}
      <div className="overflow-hidden rounded-lg shadow-md shadow-gray-200 ring-gray-200">
        <img
          src="https://imgs.search.brave.com/QaEQsOd32Fftha7phXpsacJb7hgS1BrS_NaQngNesQ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wcm9q/ZWN0LW1hbmFnZW1l/bnQtZGlhZ3JhbS12/aXJ0dWFsLXNjcmVl/bi1idXNpbmVzcy1m/aW5hbmNlLXRlY2hu/b2xvZ3ktY29uY2Vw/dC1wcm9qZWN0LW1h/bmFnZW1lbnQtZGlh/Z3JhbS12aXJ0dWFs/LXNjcmVlbi0xMzAw/Njg4NjkuanBn"
          alt="Project Image"
          className="h-27 w-full object-cover"
        />
      </div>
    </>
  );
};
