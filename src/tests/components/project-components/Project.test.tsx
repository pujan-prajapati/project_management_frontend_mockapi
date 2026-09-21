import { ProjectForm } from "@/components/my-components/project-components/ProjectForm";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import type { ProjectResponse } from "@/types/ProjectTypes";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ProjectForm", () => {
  const project: ProjectResponse = {
    id: "1",
    title: "Project 1",
    description: "Description for Project 1",
    createdAt: "2026-09-20",
  };

  // Create project
  it("should create project successfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.type(screen.getByLabelText(/title/i), "New Project");

    await user.type(
      screen.getByLabelText(/description/i),
      "New Project Description",
    );

    await user.click(
      screen.getByRole("button", {
        name: /create/i,
      }),
    );

    expect(
      await screen.findByText("Project created successfully!"),
    ).toBeInTheDocument();
  });

  // Edit project
  it("should update project successfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm project={project} closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Project");

    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Updated Project Description");

    await user.click(
      screen.getByRole("button", {
        name: /^update$/i,
      }),
    );

    expect(
      await screen.findByText("Project updated successfully!"),
    ).toBeInTheDocument();
  });
});
