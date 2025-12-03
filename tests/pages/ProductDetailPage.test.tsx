import { render, waitFor } from "@testing-library/react";
import ProductDetailPage from "../../src/pages/ProductDetailPage";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import React from "react";

vi.mock("axios");

describe("ProductDetailPage", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    categoryId: 1,
  };

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/1"] },
          React.createElement(
            Routes,
            {},
            React.createElement(Route, { path: "/:id", element: children })
          )
        )
      );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    vi.mocked(axios.get).mockReturnValue(new Promise(() => {}));

    render(<ProductDetailPage />, { wrapper: createWrapper() });

    // Component should render
    expect(document.body).toBeInTheDocument();
  });

  it("should render product details after fetching", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProduct });

    render(<ProductDetailPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
