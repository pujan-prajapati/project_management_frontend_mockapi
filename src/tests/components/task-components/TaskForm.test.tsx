import { TaskCreateBtn } from "@/components/my-components/task-components/TaskCreateBtn";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastContainer } from "react-toastify";

describe("TaskForm", () => {
  // create task test
  it("should create task successfully", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <>
        <TaskCreateBtn />
        <ToastContainer />
      </>,
    );

    const createTaskBtn = screen.getByRole("button", { name: /create task/i });
    await user.click(createTaskBtn);

    expect(
      screen.getByRole("heading", { name: /create task/i }),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/title/i), "New Task");
    await user.type(
      screen.getByLabelText(/description/i),
      "New Task Description",
    );
    await user.click(screen.getByRole("combobox", { name: "Status" }));
    await user.click(
      await screen.findByRole("option", { name: "In Progress" }),
    );
    await user.click(screen.getByRole("combobox", { name: "Priority" }));
    await user.click(await screen.findByRole("option", { name: "High" }));
    await user.click(screen.getByRole("combobox", { name: /project/i }));
    await user.click(await screen.findByRole("option", { name: "Project 1" }));

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(
      await screen.findByText("Task created successfully"),
    ).toBeInTheDocument();
  });
});
