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
