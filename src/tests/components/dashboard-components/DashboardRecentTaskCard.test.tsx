import { DashboardRecentTaskCard } from "@/components/my-components/dashboard-components/DashboardRecentTaskCard";
import { emptyTaskHandler } from "@/tests/mocks/emptyHandler";
import { taskErrorHandler } from "@/tests/mocks/errorHandler";
import { server } from "@/tests/mocks/server";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

describe("DashboardRecentTaskCard", () => {
  it("should show loading state", () => {
    renderWithQueryClient(<DashboardRecentTaskCard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error state when API fails", async () => {
    server.use(taskErrorHandler);

    renderWithQueryClient(<DashboardRecentTaskCard />);

    expect(
      await screen.findByText("Error loading recent tasks"),
    ).toBeInTheDocument();
  });

  it("should render the three recent tasks", async () => {
    renderWithQueryClient(<DashboardRecentTaskCard />);

    expect(await screen.findByText("Task 4")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

  it("should show empty message on no task", async () => {
    server.use(emptyTaskHandler);

    renderWithQueryClient(<DashboardRecentTaskCard />);

    expect(
      await screen.findByText("No recent tasks found. Please create a task."),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "View All Tasks" }),
    ).not.toBeInTheDocument();
  });
});
