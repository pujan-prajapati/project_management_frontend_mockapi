import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface DashboardRecentActivityCardProps {
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  updatedAt: string;
}

export const DashboardRecentActivityCard = ({
  description,
  name,
  status,
  updatedAt,
}: DashboardRecentActivityCardProps) => {
  return (
    <Card className="bg-gray-50 ring-0">
      <CardContent className="flex gap-4 items-center">
        <Activity />
        <div className="flex-1">
          <h3>{name}</h3>
          <p>{description}</p>

          <div className="flex justify-between items-center">
            <i>{updatedAt}</i>
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              {status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
