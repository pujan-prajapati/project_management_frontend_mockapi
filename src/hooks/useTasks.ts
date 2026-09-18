import {
  createTask,
  deleteTask,
  editTask,
  getAllProjectTask,
  getAllTasks,
} from "@/services/TaskServices";
import type { TaskFormData } from "@/types/TasksTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// use create task
export const useCreateTask = (projectId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", projectId] });
    },
  });
};

// use get all tasks
export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
};

// use delete tasks
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
};

// use edit task
export const useEditTask = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      formData,
    }: {
      taskId: string;
      formData: TaskFormData;
    }) => editTask({ taskId, formData }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({
        queryKey: ["task", projectId],
      });
    },
  });
};

// use get all project tasks
export const useGetAllProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["task", projectId],
    queryFn: () => getAllProjectTask(projectId),
  });
};
