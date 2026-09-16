import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  count: number;
  Icon: LucideIcon;
}

export const DashboardCard = ({ count, Icon, title }: DashboardCardProps) => {
  return (
    <Card className="">
      <CardContent className="flex justify-between items-center">
        <div className="space-y-2">
          <Icon />
          <h2 className="text-lg">{title}</h2>
        </div>
        <h1 className="text-3xl font-bold text-green-700">{count}</h1>
      </CardContent>
    </Card>
  );
};
