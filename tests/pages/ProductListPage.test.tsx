import { render, screen, waitFor } from "@testing-library/react";
import ProductListPage from "../../src/pages/ProductListPage";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Providers from "../../src/providers";

vi.mock("axios");

describe("ProductListPage", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", price: 10, categoryId: 1 },
    { id: 2, name: "Product 2", price: 20, categoryId: 1 },
  ];

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        BrowserRouter,
        {},
        React.createElement(
          Providers,
          {},
          React.createElement(
            QueryClientProvider,
            { client: queryClient },
            children
          )
        )
      );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    vi.mocked(axios.get).mockReturnValue(new Promise(() => {}));

    render(<ProductListPage />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render products after fetching", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("should display product prices", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("$10")).toBeInTheDocument();
      expect(screen.getByText("$20")).toBeInTheDocument();
    });
  });

  it("should render error message on API error", async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error("Network Error"));

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should show no products message when list is empty", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });

    render(<ProductListPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/no product was found/i)).toBeInTheDocument();
    });
  });

  it("should render page title", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

    render(<ProductListPage />, { wrapper: createWrapper() });

    expect(
      screen.getByRole("heading", { name: /products/i })
    ).toBeInTheDocument();
  });
});
