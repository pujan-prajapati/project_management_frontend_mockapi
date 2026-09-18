import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetAllTasks } from "@/hooks/useTasks";

export const description = "A bar chart";

const chartConfig = {
  task: {
    label: "Status",
  },
} satisfies ChartConfig;

export const DashboardChart = () => {
  const { data: tasks } = useGetAllTasks();
  const chartData = [
    {
      status: "To-do",
      count: tasks?.filter((task) => task.status === "todo").length ?? 0,
      fill: "#f97316",
    },
    {
      status: "In progress",
      count: tasks?.filter((task) => task.status === "in_progress").length ?? 0,
      fill: "#3b82f6",
    },
    {
      status: "Completed",
      count: tasks?.filter((task) => task.status === "done").length ?? 0,
      fill: "#22c55e",
    },
  ];

  return (
    <Card className="ring-gray-200 shadow-md shadow-gray-199">
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-4 text-gray-800">
          Tasks by Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8}>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="bg-white flex justify-center">
        <p className="text-sm text-gray-500">
          Overview of tasks grouped by their current status.
        </p>
      </CardFooter>
    </Card>
  );
};
