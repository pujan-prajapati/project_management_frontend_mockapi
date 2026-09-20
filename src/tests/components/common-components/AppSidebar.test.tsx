import { AppSidebar } from "@/components/my-components/common-components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      http.get("https://6aab43c8ea0e22daa6dbefed.mockapi.io/project", () => {
        return HttpResponse.json([]);
      }),
    );

    renderAppSidebar();

    expect(await screen.findByText("No projects found")).toBeInTheDocument();
  });

  it("should show error when projects API fails", async () => {
    server.use(
      http.get("https://6aab43c8ea0e22daa6dbefed.mockapi.io/project", () => {
        console.log("ERROR HANDLER HIT");
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    renderAppSidebar();

    expect(
      await screen.findByText("Error loading projects"),
    ).toBeInTheDocument();
  });
});
