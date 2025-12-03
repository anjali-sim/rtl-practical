import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../../src/components/NavBar";
import { useCart } from "../../src/hooks/useCart";

vi.mock("../../src/hooks/useCart");
vi.mock("../../src/components/LanguageSelector");
vi.mock("../../src/components/AuthStatus");

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NavBar", () => {
  it("should render navigation bar", () => {
    const mockGetItemCount = vi.fn(() => 0);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render home link", () => {
    const mockGetItemCount = vi.fn(() => 0);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    const mockGetItemCount = vi.fn(() => 0);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    const productsLink = screen.getByRole("link", { name: /products/i });
    const playgroundLink = screen.getByRole("link", { name: /playground/i });
    const adminLink = screen.getByRole("link", { name: /admin/i });

    expect(productsLink).toBeInTheDocument();
    expect(playgroundLink).toBeInTheDocument();
    expect(adminLink).toBeInTheDocument();
  });

  it("should display cart item count", () => {
    const mockGetItemCount = vi.fn(() => 3);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("3");
  });

  it("should display zero cart count", () => {
    const mockGetItemCount = vi.fn(() => 0);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("0");
  });

  it("should call getItemCount", () => {
    const mockGetItemCount = vi.fn(() => 5);
    vi.mocked(useCart).mockReturnValue({
      getItemCount: mockGetItemCount,
    } as unknown as ReturnType<typeof useCart>);

    renderWithRouter(<NavBar />);

    expect(mockGetItemCount).toHaveBeenCalled();
  });
});
