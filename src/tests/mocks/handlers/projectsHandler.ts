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
];
