import { Navbar } from "@/components/my-components/common-components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Navbar", () => {
  it("should verify logout by removing the fullName on localstorage", async () => {
    const user = userEvent.setup();
    localStorage.setItem("fullName", "Pujan Prajapati");

    render(
      <SidebarProvider>
        <Navbar />
      </SidebarProvider>,
    );

    const avatar = screen.getByRole("button", { name: /open user menu/i });
    fireEvent.click(avatar);

    const logoutBtn = screen.getByRole("menuitem", { name: /logout/i });
    await user.click(logoutBtn);

    expect(localStorage.getItem("fullName")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith({ to: "/register" });
  });
});
