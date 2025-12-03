import { renderHook, waitFor } from "@testing-library/react";
import useCategories from "../../src/hooks/useCategories";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

vi.mock("axios");

describe("useCategories", () => {
  const mockCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
  ];

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
        children
      );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch categories successfully", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockCategories });

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCategories);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when fetching categories fails", async () => {
    const errorMessage = "Network Error";
    vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("should call axios.get with correct endpoint", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockCategories });

    renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/categories");
    });
  });

  it("should return empty array when no categories exist", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
  });
});
