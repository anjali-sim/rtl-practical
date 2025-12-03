import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../src/components/LogoutButton";

vi.mock("@auth0/auth0-react");

describe("LogoutButton", () => {
  it("should render logout button", () => {
    const mockLogout = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({
      logout: mockLogout,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: /log out/i });
    expect(button).toBeInTheDocument();
  });

  it("should call logout with correct parameters when clicked", async () => {
    const mockLogout = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({
      logout: mockLogout,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<LogoutButton />);

    const button = screen.getByRole("button", { name: /log out/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
