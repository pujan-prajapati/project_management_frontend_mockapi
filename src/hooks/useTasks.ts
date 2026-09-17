import {
  createTask,
  deleteTask,
  editTask,
  getAllProjectTask,
} from "@/services/task.services";
import type { TaskFormData } from "@/types/Tasks.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

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
      queryClient.invalidateQueries({
        queryKey: ["tasks", projectId],
      });
    },
  });
};

export const useGetAllProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getAllProjectTask(projectId),
  });
};
