import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../src/components/LoginButton";

vi.mock("@auth0/auth0-react");

describe("LoginButton", () => {
  it("should render login button", () => {
    const mockLoginWithRedirect = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<LoginButton />);

    const button = screen.getByRole("button", { name: /log in/i });
    expect(button).toBeInTheDocument();
  });

  it("should call loginWithRedirect when clicked", async () => {
    const mockLoginWithRedirect = vi.fn();
    vi.mocked(useAuth0).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<LoginButton />);

    const button = screen.getByRole("button", { name: /log in/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });
});
