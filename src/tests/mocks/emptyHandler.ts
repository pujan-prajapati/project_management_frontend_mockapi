import { http, HttpResponse } from "msw";
import { API_URL } from "./constants";

export const emptyTaskHandler = http.get(`${API_URL}/task`, () => {
  return HttpResponse.json([]);
});

export const emptyProjectHandler = http.get(`${API_URL}/project`, () => {
  return HttpResponse.json([]);
});
