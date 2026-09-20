import { httpDelete, httpGet, httpPost, httpPut } from "@/axios";
import type { ProjectFormData, ProjectResponse } from "@/types/ProjectTypes";

// create project
export const createProject = async (formData: ProjectFormData) => {
  const response = await httpPost<ProjectFormData, ProjectResponse>(
    "/project",
    formData,
  );
  return response.data;
};

// get all projects
export const getAllProjects = async () => {
  const response = await httpGet<ProjectResponse[]>("/project");
  return response.data;
};

// get project by id
export const getProjectById = async (projectId: string) => {
  const response = await httpGet<ProjectResponse[]>(`/project?id=${projectId}`);
  return response.data[0];
};

// delete project
export const deleteProject = async (projectId: string) => {
  const response = await httpDelete(`/project/${projectId}`);
  return response.data;
};

// edit project
export const editProject = async ({
  projectId,
  formData,
}: {
  projectId: string;
  formData: ProjectFormData;
}) => {
  const response = await httpPut(`/project/${projectId}`, formData);
  return response.data;
};
