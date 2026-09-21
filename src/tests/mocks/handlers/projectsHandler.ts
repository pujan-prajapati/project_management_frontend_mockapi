import { http, HttpResponse } from "msw";
import { API_URL } from "../constants";

export const projectsHandlers = [
  http.get(`${API_URL}/project`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Project 1",
        description: "Description for Project 1",
        createdAt: "2026-09-20",
      },
      {
        id: "2",
        title: "Project 2",
        description: "Description for Project 2",
        createdAt: "2026-09-21",
      },
    ]);
  }),

  http.post(`${API_URL}/project`, async ({ request }) => {
    const project = (await request.json()) as {
      title: string;
      description: string;
      createdAt: string;
    };

    return HttpResponse.json(
      {
        id: "3",
        ...project,
      },
      { status: 201 },
    );
  }),

  http.put(`${API_URL}/project/:projectId`, async ({ params, request }) => {
    const project = (await request.json()) as {
      title: string;
      description: string;
    };

    return HttpResponse.json({
      id: params.projectId,
      ...project,
      createdAt: "2026-09-20",
    });
  }),

  http.post(`${API_URL}/task`, () => {
    return HttpResponse.json(
      {
        id: "5",
        title: "New Task",
        description: "New task description",
        priority: "high",
        projectId: "1",
        status: "in_progress",
        createdAt: "2026-09-21",
      },
      { status: 201 },
    );
  }),

  http.put(`${API_URL}/task/:taskId`, ({ params }) => {
    return HttpResponse.json({
      id: params.taskId,
      title: "Updated Task",
      description: "Updated Task Description",
      priority: "high",
      projectId: "1",
      status: "in_progress",
      createdAt: "2026-09-10",
    });
  }),

  http.delete(`${API_URL}/task/:taskId`, ({ params }) => {
    return HttpResponse.json({
      message: `Task ${params.taskId} deleted successfully`,
    });
  }),
];
