import { getAllProjects } from "@/services/project.services";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
};
