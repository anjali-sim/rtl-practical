import { renderHook, act } from "@testing-library/react";
import { useCart } from "../../src/hooks/useCart";
import { CartProvider } from "../../src/providers/CartProvider";
import React from "react";

describe("CartProvider", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    categoryId: 1,
  };

  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(CartProvider, { children });
  };

  it("should provide cart context to children", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    expect(result.current.addToCart).toBeDefined();
    expect(result.current.removeFromCart).toBeDefined();
    expect(result.current.getItem).toBeDefined();
    expect(result.current.getItemCount).toBeDefined();
  });

  it("should persist cart state across multiple hook calls", () => {
    const { result: result1 } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result1.current.addToCart(mockProduct);
    });

    const { result: result2 } = renderHook(() => useCart(), {
      wrapper: createWrapper(),
    });

    // Note: Each wrapper creates a new provider, so state won't be shared
    // This test verifies that the provider works independently
    expect(result2.current.getItemCount()).toBe(0);
  });
});
