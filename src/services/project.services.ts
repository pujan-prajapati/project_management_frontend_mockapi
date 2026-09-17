import { httpDelete, httpGet, httpPost, httpPut } from "@/axios";
import type { ProjectFormData, ProjectResponse } from "@/types/Project.types";

// create project
export const createProject = async (formData: ProjectFormData) => {
  try {
    const response = await httpPost<ProjectFormData, ProjectResponse>(
      "/project",
      formData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// get all projects
export const getAllProjects = async () => {
  try {
    const response = await httpGet<ProjectResponse[]>("/project");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// get project by id
export const getProjectById = async (projectId: string) => {
  try {
    const response = await httpGet<ProjectResponse[]>(
      `/project?id=${projectId}`,
    );
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching project with id ${projectId}:`, error);
  }
};

// delete project
export const deleteProject = async (projectId: string) => {
  try {
    const response = await httpDelete(`/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with id ${projectId}:`, error);
  }
};

// edit project
export const editProject = async ({
  projectId,
  formData,
}: {
  projectId: string;
  formData: ProjectFormData;
}) => {
  try {
    const response = await httpPut(`/project/${projectId}`, formData);
    return response.data;
  } catch (error) {
    console.error(`Error editing project with id ${projectId}:`, error);
  }
};
