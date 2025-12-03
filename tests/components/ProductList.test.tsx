import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ProductList from "../../src/components/ProductList";

vi.mock("axios");

describe("ProductList", () => {
  it("should render loading state initially", () => {
    vi.mocked(axios.get).mockReturnValue(
      new Promise(() => {}) // Never resolves to keep loading state
    );

    render(<ProductList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render products after fetching", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 10, categoryId: 1 },
      { id: 2, name: "Product 2", price: 20, categoryId: 1 },
    ];

    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("should render error message on API error", async () => {
    const errorMessage = "Network Error";
    vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should render no products message when list is empty", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/no products available/i)).toBeInTheDocument();
    });
  });

  it("should render products as list items", async () => {
    const mockProducts = [
      { id: 1, name: "Laptop", price: 1000, categoryId: 1 },
      { id: 2, name: "Mouse", price: 25, categoryId: 2 },
      { id: 3, name: "Keyboard", price: 75, categoryId: 2 },
    ];

    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    render(<ProductList />);

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
    });
  });
});
