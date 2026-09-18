import * as z from "zod";

export const projectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
});

export const projectTaskFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});
