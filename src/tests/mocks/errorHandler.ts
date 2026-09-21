import { http, HttpResponse } from "msw";
import { API_URL } from "./constants";

export const taskErrorHandler = http.get(`${API_URL}/task`, () => {
  return HttpResponse.json(
    {
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
});

export const projectErrorHandler = http.get(`${API_URL}/project`, () => {
  return HttpResponse.json(
    {
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
});

export const createProjectErrorHandler = http.post(`${API_URL}/project`, () => {
  return HttpResponse.json(
    {
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
});

export const updateProjectErrorHandler = http.put(
  `${API_URL}/project/:projectId`,
  () => {
    return HttpResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  },
);

export const deleteProjectErrorHandler = http.delete(
  `${API_URL}/project/:projectId`,
  () => {
    return HttpResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  },
);
