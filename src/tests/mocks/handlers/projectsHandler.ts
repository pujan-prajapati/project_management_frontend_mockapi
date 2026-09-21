import { http, HttpResponse } from "msw";
import { API_URL } from "../constants";

export const projectsHandlers = [
  // get all projects
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

  // create project
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

  // update project
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

  // delete project
  http.delete(`${API_URL}/project/:projectId`, ({ params }) => {
    const projectId = params.projectId;
    return HttpResponse.json(
      {
        message: `Project with ID ${projectId} deleted successfully.`,
      },
      { status: 200 },
    );
  }),
];
