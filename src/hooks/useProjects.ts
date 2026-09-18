import {
  createProject,
  deleteProject,
  editProject,
  getAllProjects,
  getProjectById,
} from "@/services/ProjectServices";
import type { ProjectFormData } from "@/types/Project.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
};

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
  });
};

export const useEditProject = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: ProjectFormData }) =>
      editProject({ projectId, formData }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
