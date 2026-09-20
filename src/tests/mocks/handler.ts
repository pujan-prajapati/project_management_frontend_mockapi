import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://6aab43c8ea0e22daa6dbefed.mockapi.io/project", () => {
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

  http.get("https://6aab43c8ea0e22daa6dbefed.mockapi.io/task", () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Task 1",
        status: "done",
      },
      {
        id: "2",
        title: "Task 2",
        status: "in-progress",
      },
    ]);
  }),
];
