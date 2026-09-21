import { TaskPage } from "@/components/my-components/task-components/TaskDetailPage";
import { emptyTaskHandler } from "@/tests/mocks/emptyHandler";
import { server } from "@/tests/mocks/server";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TaskDetailPage", () => {
  // display all the tasks
  it("should display all the tasks", async () => {
    renderWithQueryClient(<TaskPage />);

    expect(await screen.findByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
  });

  // handle empty task
  it("should handle empty task", async () => {
    server.use(emptyTaskHandler);
    renderWithQueryClient(<TaskPage />);

    expect(
      await screen.findByText("No tasks found. Please create a task."),
    ).toBeInTheDocument();
  });

  // handle filter by title
  it("should filter tasks by title", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TaskPage />);

    await screen.findByText("Task 1");

    const filterInput = screen.getByPlaceholderText("Filter title...");
    await user.type(filterInput, "Task 1");

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 4")).not.toBeInTheDocument();
  });

  // handle filter by status
  it("should filter tasks by status", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TaskPage />);

    await screen.findByText("Task 1");

    const statusSelect = screen.getByRole("combobox", {
      name: "Filter by status",
    });
    await user.click(statusSelect);
    await user.click(await screen.findByRole("option", { name: "Done" }));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();

    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
  });

  // handle filter by priority
  it("should filter tasks by priority", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TaskPage />);

    await screen.findByText("Task 1");

    const prioritySelect = screen.getByRole("combobox", {
      name: "Filter by priority",
    });
    await user.click(prioritySelect);
    await user.click(await screen.findByRole("option", { name: "High" }));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();

    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Task 3")).not.toBeInTheDocument();
  });
});
