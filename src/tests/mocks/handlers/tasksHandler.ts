import { http, HttpResponse } from "msw";
import { API_URL } from "../constants";

export const tasksHandlers = [
  http.post(`${API_URL}/task`, async () => {
    return HttpResponse.json({
      message: "Task created successfully",
    });
  }),

  http.get(`${API_URL}/task`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Task 1",
        description: "Description for Task 1",
        priority: "high",
        projectId: "1",
        status: "done",
        createdAt: "2026-09-10",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Description for Task 2",
        priority: "medium",
        projectId: "1",
        status: "in_progress",
        createdAt: "2026-09-20",
      },
      {
        id: "3",
        title: "Task 3",
        description: "Description for Task 3",
        priority: "low",
        projectId: "2",
        status: "todo",
        createdAt: "2026-09-15",
      },
      {
        id: "4",
        title: "Task 4",
        description: "Description for Task 4",
        priority: "high",
        projectId: "2",
        status: "done",
        createdAt: "2026-09-21",
      },
    ]);
  }),

  http.delete(`${API_URL}/task/:id`, ({ params }) => {
    return HttpResponse.json({
      message: `Task with id ${params.id} deleted successfully`,
    });
  }),

  http.put(`${API_URL}/task/:id`, ({ params }) => {
    return HttpResponse.json({
      message: `Task with id ${params.id} updated successfully`,
    });
  }),
];
