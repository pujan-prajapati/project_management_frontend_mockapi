import { AppSidebar } from "@/components/my-components/common-components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { API_URL } from "@/tests/mocks/constants";
import { projectErrorHandler } from "@/tests/mocks/errorHandler";
import { server } from "@/tests/mocks/server";
import { renderWithQueryClient } from "@/tests/utils/renderWithQueryClient";
import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

const renderAppSidebar = () => {
  renderWithQueryClient(
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>,
  );
};

describe("AppSidebar", () => {
  it("should show loading state in app sidebar", () => {
    renderAppSidebar();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display projects when API succeeds", async () => {
    renderAppSidebar();

    expect(await screen.findByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  it("should show no project when there are no proejcts", async () => {
    server.use(
      http.get(`${API_URL}/project`, () => {
        return HttpResponse.json([]);
      }),
    );

    renderAppSidebar();

    expect(await screen.findByText("No projects found")).toBeInTheDocument();
  });

  it("should show error when projects API fails", async () => {
    server.use(projectErrorHandler);

    renderAppSidebar();

    expect(
      await screen.findByText("Error loading projects"),
    ).toBeInTheDocument();
  });
});
