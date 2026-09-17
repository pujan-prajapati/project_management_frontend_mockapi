import axios from "axios";

export const http = axios.create({
  baseURL: "https://6aab43c8ea0e22daa6dbefed.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpPost = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
) => {
  const response = http.post<TResponse>(url, data);
  return response;
};

export const httpDelete = async <TResponse>(url: string) => {
  const response = http.delete<TResponse>(url);
  return response;
};

export const httpPut = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
) => {
  const response = http.put<TResponse>(url, data);
  return response;
};

export const httpGet = async <T>(
  url: string,
  params?: Record<string, unknown>,
) => {
  const response = http.get<T>(url, { params: params });
  return response;
};
