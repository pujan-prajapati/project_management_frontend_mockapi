import { http, HttpResponse } from "msw";
import { API_URL } from "./constants";

export const handlers = [
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

  http.get(`${API_URL}/task`, () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Task 1",
        status: "done",
        createdAt: "2026-09-10",
      },
      {
        id: "2",
        title: "Task 2",
        status: "in-progress",
        createdAt: "2026-09-20",
      },
      {
        id: "3",
        title: "Task 3",
        status: "todo",
        createdAt: "2026-09-15",
      },
      {
        id: "4",
        title: "Task 4",
        status: "done",
        createdAt: "2026-09-21",
      },
    ]);
  }),
];
