import { httpGet, httpPost } from "@/axios";
import type { ProjectFormData, ProjectResponse } from "@/types/Project.types";

// create project
export const createProject = async (formData: ProjectFormData) => {
  try {
    const response = await httpPost("/project", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
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
