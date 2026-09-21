import { DashboardCard } from "@/components/my-components/dashboard-components/DashboardCard";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen, waitFor } from "@testing-library/react";

describe("Dashboard Card", () => {
  it("should display correct project and task counts", async () => {
    renderWithQueryClient(<DashboardCard />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Total Projects count" }),
      ).toHaveTextContent("2");
      expect(
        screen.getByRole("heading", { name: "Total Tasks count" }),
      ).toHaveTextContent("4");
      expect(
        screen.getByRole("heading", { name: "Total Completed count" }),
      ).toHaveTextContent("2");
    });
  });
});
