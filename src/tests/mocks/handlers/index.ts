import { projectsHandlers } from "./projectsHandler";
import { tasksHandlers } from "./tasksHandler";

export const handlers = [...projectsHandlers, ...tasksHandlers];
