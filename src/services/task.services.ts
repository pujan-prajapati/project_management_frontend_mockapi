import { httpDelete, httpGet, httpPost, httpPut } from "@/axios";
import type { TaskFormData, TaskResponse } from "@/types/Tasks.types";

// create task
export const createTask = async (formData: TaskFormData) => {
  try {
    const response = await httpPost("/task", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

// get all project tasks
export const getAllProjectTask = async (projectId: string) => {
  try {
    const response = await httpGet<TaskResponse[]>(
      `/task?projectId=${projectId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${projectId}:`, error);
  }
};

// delete task
export const deleteTask = async (taskId: string) => {
  try {
    const response = await httpDelete(`/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with id ${taskId}:`, error);
  }
};

// edit task
export const editTask = async ({
  taskId,
  formData,
}: {
  taskId: string;
  formData: TaskFormData;
}) => {
  try {
    const response = await httpPut(`/task/${taskId}`, formData);
    return response.data;
  } catch (error) {
    console.error(`Error editing task with id ${taskId}:`, error);
  }
};
