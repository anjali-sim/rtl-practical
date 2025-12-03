import { renderHook, waitFor } from "@testing-library/react";
import useProduct from "../../src/hooks/useProduct";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

vi.mock("axios");

describe("useProduct", () => {
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
        children
      );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch product successfully", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProduct });

    const { result } = renderHook(() => useProduct(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockProduct);
    expect(result.current.error).toBeNull();
  });

  it("should call axios.get with correct endpoint", async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockProduct });

    renderHook(() => useProduct(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/products/1");
    });
  });

  it("should handle 404 error by returning null", async () => {
    const error = new Error("Not Found");
    Object.assign(error, { response: { status: 404 } });
    vi.mocked(axios.get).mockRejectedValue(error);

    const { result } = renderHook(() => useProduct(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
  });

  it("should handle other errors", async () => {
    const errorMessage = "Server Error";
    vi.mocked(axios.get).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProduct(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it("should not fetch when productId is NaN", async () => {
    const { result } = renderHook(() => useProduct(NaN), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });
});
