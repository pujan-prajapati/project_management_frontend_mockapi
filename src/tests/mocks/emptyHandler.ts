import { http, HttpResponse } from "msw";
import { API_URL } from "./constants";

export const emptyTaskHandler = http.get(`${API_URL}/task`, () => {
  return HttpResponse.json([]);
});
