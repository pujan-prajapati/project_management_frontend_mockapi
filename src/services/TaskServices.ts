import { httpDelete, httpGet, httpPost, httpPut } from "@/axios";
import type { TaskFormData, TaskResponse } from "@/types/TasksTypes";

// create task
export const createTask = async (formData: TaskFormData) => {
  const response = await httpPost("/task", formData);
  return response.data;
};

// get all tasks
export const getAllTasks = async () => {
  const response = await httpGet<TaskResponse[]>("/task");
  return response.data;
};

// get all project tasks
export const getAllProjectTask = async (projectId: string) => {
  const response = await httpGet<TaskResponse[]>(
    `/task?projectId=${projectId}`,
  );
  return response.data;
};

// delete task
export const deleteTask = async (taskId: string) => {
  const response = await httpDelete(`/task/${taskId}`);
  return response.data;
};

// edit task
export const editTask = async ({
  taskId,
  formData,
}: {
  taskId: string;
  formData: TaskFormData;
}) => {
  const response = await httpPut(`/task/${taskId}`, formData);
  return response.data;
};
