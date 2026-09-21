import { TaskTableActionBtn } from "@/components/my-components/task-components/TaskTableActionBtn";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import type { TaskResponse } from "@/types/TasksTypes";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

describe("TaskTableActionButton", () => {
  const task: TaskResponse = {
    id: "1",
    title: "Task 1",
    description: "Description for Task 1",
    priority: "high",
    projectId: "1",
    status: "done",
    createdAt: "2026-09-10",
  };

  //   delete task test
  it("should delete task sucessfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <TaskTableActionBtn task={task} />
        <ToastContainer />
      </>,
    );
    const dropdownTrigger = screen.getByRole("button", {
      name: /open task actions/i,
    });
    fireEvent.click(dropdownTrigger);

    const deleteOption = screen.getByRole("menuitem", { name: /delete/i });
    await user.click(deleteOption);

    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(deleteButton);

    expect(screen.getByText("Task deleted successfully")).toBeInTheDocument();
  });

  // update task test
  it("should update task successfully", async () => {
    const user = userEvent.setup();

    renderWithQueryClient(
      <>
        <TaskTableActionBtn task={task} />
        <ToastContainer />
      </>,
    );
    const dropdownTrigger = screen.getByRole("button", {
      name: /open task actions/i,
    });
    fireEvent.click(dropdownTrigger);

    const editOption = screen.getByRole("menuitem", { name: /edit/i });
    await user.click(editOption);

    expect(
      screen.getByRole("heading", { name: /edit task/i }),
    ).toBeInTheDocument();
    await user.type(screen.getByLabelText(/title/i), "Updated Task");
    await user.type(
      screen.getByLabelText(/description/i),
      "Updated Task Description",
    );
    await user.click(screen.getByRole("combobox", { name: "Status" }));
    await user.click(
      await screen.findByRole("option", { name: "In Progress" }),
    );
    await user.click(screen.getByRole("combobox", { name: "Priority" }));
    await user.click(await screen.findByRole("option", { name: "High" }));
    await user.click(screen.getByRole("combobox", { name: /project/i }));
    await user.click(await screen.findByRole("option", { name: "Project 1" }));

    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(
      await screen.findByText("Task updated successfully"),
    ).toBeInTheDocument();
  });
});
