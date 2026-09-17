import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CustomFormField } from "../commom-components/CustomFormField";
import { Button } from "@/components/ui/button";
import { createProject } from "@/services/project.services";
import { toast } from "react-toastify";

const projectFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
});

export const ProjectForm = () => {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof projectFormSchema>) => {
    try {
      const project = await createProject(data);
      console.log("Project created:", project);
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error creating project.");
    }
  };

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <CustomFormField
          control={form.control}
          name="title"
          label="Title"
          required
        />
        <CustomFormField
          control={form.control}
          name="description"
          label="Description"
          required
        />
      </FieldGroup>

      <div className="mt-4 float-end">
        <Button size={"lg"} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};
