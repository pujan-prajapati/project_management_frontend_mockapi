import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

interface DashboardRecentTaskCardProps {
  title: string;
  project: string;
  status: "todo" | "in-progress" | "completed";
  updatedAt: string;
}

export const DashboardRecentTaskCard = ({
  status,
  title,
  updatedAt,
  project,
}: DashboardRecentTaskCardProps) => {
  return (
    <Card className="bg-gray-50 ring-0">
      <CardContent className="flex gap-4 items-center">
        <ClipboardList />
        <div className="flex-1">
          <p>{project}</p>
          <h3>{title}</h3>

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
