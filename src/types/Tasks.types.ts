export type Tasks = {
  id: number;
  title: string;
  project: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
};

