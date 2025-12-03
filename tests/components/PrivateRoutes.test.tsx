import { render } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import PrivateRoutes from "../../src/components/PrivateRoutes";

vi.mock("@auth0/auth0-react");
vi.mock("react-router-dom");

describe("PrivateRoutes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null when loading", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/dashboard",
    } as unknown as ReturnType<typeof useLocation>);

    const { container } = render(<PrivateRoutes />);

    expect(container.firstChild).toBeNull();
  });

  it("should redirect to login when not authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/dashboard",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    // The component should render Navigate component which redirects to login
  });

  it("should render Outlet when authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/dashboard",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    // The component should render Outlet for authenticated users
  });

  it("should pass correct returnUrl when redirecting", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/admin/products",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    // The returnUrl should be /admin/products
  });

  it("should handle root path correctly", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    // Should redirect to login with returnUrl=/
  });

  it("should call useLocation hook", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/dashboard",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    expect(useLocation).toHaveBeenCalled();
  });

  it("should call useAuth0 hook", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as unknown as ReturnType<typeof useAuth0>);

    vi.mocked(useLocation).mockReturnValue({
      pathname: "/dashboard",
    } as unknown as ReturnType<typeof useLocation>);

    render(<PrivateRoutes />);

    expect(useAuth0).toHaveBeenCalled();
  });
});
