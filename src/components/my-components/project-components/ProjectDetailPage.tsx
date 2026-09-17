import { useParams } from "@tanstack/react-router";

export const ProjectDetailPage = () => {
  const { projectId } = useParams({ from: "/(dashboard)/projects/$projectId" });

  return <div>{projectId}</div>;
};
