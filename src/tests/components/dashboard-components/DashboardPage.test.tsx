import { DashboardPage } from "@/components/my-components/dashboard-components/DashboardPage";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen } from "@testing-library/react";

describe("DashboardPage", () => {
  it("should render name from local storage", () => {
    localStorage.setItem("fullName", "Pujan Prajapati");

    renderWithQueryClient(<DashboardPage />);

    expect(
      screen.getByText("Welcome, Pujan Prajapati! 👋"),
    ).toBeInTheDocument();
  });
});
