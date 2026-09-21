import { ProjectTaskCard } from "@/components/my-components/project-components/ProjectTaskCard";
import { ProjectTaskForm } from "@/components/my-components/project-components/ProjectTaskForm";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import type { TaskResponse } from "@/types/TasksTypes";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

vi.mock("@tanstack/react-router", () => ({
  useParams: () => ({
    projectId: "1",
  }),
}));

describe("ProjectTaskCard and ProjectTaskForm", () => {
  const task: TaskResponse = {
    id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    priority: "high",
    projectId: "1",
    status: "done",
    createdAt: "2026-09-10",
  };

  // Display project task information
  it("should display task information", () => {
    renderWithQueryClient(<ProjectTaskCard task={task} />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description for Task 1")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("2026-09-10")).toBeInTheDocument();
  });

  // Delete project task
  it("should delete project task", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectTaskCard task={task} />
        <ToastContainer />
      </>,
    );

    const dropdownTrigger = screen.getByRole("button", {
      name: /open project task actions/i,
    });

    fireEvent.click(dropdownTrigger);

    await user.click(
      screen.getByRole("menuitem", {
        name: /delete/i,
      }),
    );

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /^delete$/i,
      }),
    );

    expect(
      await screen.findByText("Task deleted successfully"),
    ).toBeInTheDocument();
  });

  // Update project task
  it("should update project task successfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectTaskForm task={task} closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Task");

    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Updated Task Description");

    // Status
    fireEvent.click(
      screen.getByRole("combobox", {
        name: /status/i,
      }),
    );
    await user.click(
      screen.getByRole("option", {
        name: /in progress/i,
      }),
    );

    // Priority
    fireEvent.click(
      screen.getByRole("combobox", {
        name: /priority/i,
      }),
    );

    await user.click(
      screen.getByRole("option", {
        name: /high/i,
      }),
    );

    // Submit
    await user.click(
      screen.getByRole("button", {
        name: /update/i,
      }),
    );

    expect(
      await screen.findByText("Task updated successfully"),
    ).toBeInTheDocument();
  });

  // Create project task
  it("should create project task successfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <ProjectTaskForm closeDialog={vi.fn()} />
        <ToastContainer />
      </>,
    );

    await user.type(screen.getByLabelText(/title/i), "New Task");

    await user.type(
      screen.getByLabelText(/description/i),
      "New Task Description",
    );

    // Status
    fireEvent.click(
      screen.getByRole("combobox", {
        name: /status/i,
      }),
    );

    await user.click(
      screen.getByRole("option", {
        name: /in progress/i,
      }),
    );

    // Priority
    fireEvent.click(
      screen.getByRole("combobox", {
        name: /priority/i,
      }),
    );

    await user.click(
      screen.getByRole("option", {
        name: /high/i,
      }),
    );

    // Submit
    await user.click(
      screen.getByRole("button", {
        name: /create/i,
      }),
    );

    expect(
      await screen.findByText("Task created successfully"),
    ).toBeInTheDocument();
  });
});
