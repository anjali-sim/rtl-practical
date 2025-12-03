import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthStatus from "../../src/components/AuthStatus";

vi.mock("@auth0/auth0-react");
vi.mock("../../src/components/LoginButton");
vi.mock("../../src/components/LogoutButton");

describe("AuthStatus", () => {
  it("should render loading state", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      user: null,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<AuthStatus />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render user name and logout button when authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      user: { name: "John Doe" },
    } as unknown as ReturnType<typeof useAuth0>);

    render(<AuthStatus />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render login button when not authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      user: null,
    } as unknown as ReturnType<typeof useAuth0>);

    render(<AuthStatus />);
  });
});
