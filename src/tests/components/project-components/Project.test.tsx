import { ProjectForm } from "@/components/my-components/project-components/ProjectForm";
import {
  createProjectErrorHandler,
  deleteProjectErrorHandler,
  updateProjectErrorHandler,
} from "@/tests/mocks/errorHandler";
import { server } from "@/tests/mocks/server";
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

  // Create project test
  it("should create project successfully", async () => {
    const closeDialogMock = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={closeDialogMock} />
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
    expect(closeDialogMock).toHaveBeenCalled();
  });

  // error test for create project
  it("should show error on create fail", async () => {
    server.use(createProjectErrorHandler);
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
      await screen.findByText("Error creating project."),
    ).toBeInTheDocument();
  });

  // Edit project
  it("should update project successfully", async () => {
    const closeDialogMock = vi.fn();
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm project={project} closeDialog={closeDialogMock} />
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
        name: /update/i,
      }),
    );

    expect(
      await screen.findByText("Project updated successfully!"),
    ).toBeInTheDocument();
    expect(closeDialogMock).toHaveBeenCalled();
  });

  // error test for edit project
  it("should show error on edit fail", async () => {
    server.use(updateProjectErrorHandler);
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={vi.fn()} project={project} />
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
        name: /update/i,
      }),
    );

    expect(
      await screen.findByText("Error updating project."),
    ).toBeInTheDocument();
  });

  // validation error test for empty form submmition
  it("should show validation errors when create form is submitted empty", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /create/i,
      }),
    );

    expect(
      await screen.findByText("Title must be at least 3 characters."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Description must be at least 3 characters."),
    ).toBeInTheDocument();
  });

  // validation error test for partial submittion only description no title
  it("should show validation error for title", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.type(screen.getByLabelText(/title/i), "a");
    await user.type(
      screen.getByLabelText(/description/i),
      "This is test description",
    );

    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(
      await screen.findByText("Title must be at least 3 characters."),
    ).toBeInTheDocument();
  });

  // validation error test for partial submittion only title no description
  it("should show validation error for description", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <ProjectForm closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.type(screen.getByLabelText(/title/i), "Test title");
    await user.type(screen.getByLabelText(/description/i), "a");

    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(
      await screen.findByText("Description must be at least 3 characters."),
    ).toBeInTheDocument();
  });

  // delete project test
  it("should successfully delete the project", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectForm project={project} closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /delete project popover/i,
      }),
    );

    expect(
      screen.getByText(
        "Are you sure you want to delete this project? This action cannot be undone.",
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /delete project button/i }),
    );
    expect(
      await screen.findByText("Project deleted successfully!"),
    ).toBeInTheDocument();
  });

  // error delete project test
  it("should show an error when deleting the project fails", async () => {
    const user = userEvent.setup();
    server.use(deleteProjectErrorHandler);

    renderWithQueryClient(
      <>
        <ProjectForm project={project} closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /delete project popover/i,
      }),
    );

    expect(
      screen.getByText(
        "Are you sure you want to delete this project? This action cannot be undone.",
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /delete project button/i }),
    );
    expect(
      await screen.findByText("Error deleting project."),
    ).toBeInTheDocument();
  });
});
