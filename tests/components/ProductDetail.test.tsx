import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";

describe("ProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show error message for invalid product id", () => {
    render(<ProductDetail productId={0} />);

    expect(screen.getByText(/invalid productid/i)).toBeInTheDocument();
  });

  it("should display loading state initially", () => {
    global.fetch = vi.fn(
      () => new Promise(() => {}) // Never resolves
    ) as unknown as typeof fetch;

    render(<ProductDetail productId={1} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display product details after fetch", async () => {
    const mockProduct = { id: 1, name: "Laptop", price: 999, categoryId: 1 };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProduct),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductDetail productId={1} />);

    await waitFor(() => {
      expect(screen.getByText("Name: Laptop")).toBeInTheDocument();
      expect(screen.getByText("Price: $999")).toBeInTheDocument();
    });
  });

  it("should display error message on fetch failure", async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as unknown as typeof fetch;

    render(<ProductDetail productId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should display not found message when product is null", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductDetail productId={999} />);

    await waitFor(() => {
      expect(
        screen.getByText(/the given product was not found/i)
      ).toBeInTheDocument();
    });
  });

  it("should render product detail heading", async () => {
    const mockProduct = { id: 1, name: "Mouse", price: 25, categoryId: 2 };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProduct),
      } as Response)
    ) as unknown as typeof fetch;

    render(<ProductDetail productId={1} />);

    await waitFor(() => {
      expect(screen.getByText("Product Detail")).toBeInTheDocument();
    });
  });
});
