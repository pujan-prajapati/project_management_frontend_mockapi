import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { status: "to-do", count: 8 },
  { status: "in-progress", count: 6 },
  { status: "completed", count: 12 },
];

const chartConfig = {
  task: {
    label: "Status",
    color: "oklch(62.7% 0.194 149.214)",
  },
} satisfies ChartConfig;

export const DashboardChart = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
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
            <Bar dataKey="count" fill="var(--color-task)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
