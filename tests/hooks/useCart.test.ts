import { renderHook, act } from "@testing-library/react";
import { useCart } from "../../src/hooks/useCart";
import { CartProvider } from "../../src/providers/CartProvider";
import { Product } from "../../src/entities";

describe("useCart", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 100,
    categoryId: 1,
  };

  const renderUseCart = () => {
    return renderHook(() => useCart(), {
      wrapper: CartProvider,
    });
  };

  it("should throw error when used outside CartProvider", () => {
    // Suppress error logs for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow("useCart must be used within a CartProvider");

    consoleSpy.mockRestore();
  });

  it("should initialize with empty cart", () => {
    const { result } = renderUseCart();

    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getItem(mockProduct)).toBeNull();
  });

  it("should add product to cart", () => {
    const { result } = renderUseCart();

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.getItemCount()).toBe(1);
    const item = result.current.getItem(mockProduct);
    expect(item).not.toBeNull();
    expect(item?.quantity).toBe(1);
    expect(item?.product.id).toBe(1);
  });

  it("should increment quantity when adding same product twice", () => {
    const { result } = renderUseCart();

    act(() => {
      result.current.addToCart(mockProduct);
    });
    act(() => {
      result.current.addToCart(mockProduct);
    });

    // getItemCount returns total quantity, which should be 2
    expect(result.current.getItemCount()).toBe(2);
    const item = result.current.getItem(mockProduct);
    expect(item?.quantity).toBe(2);
  });

  it("should remove product from cart", () => {
    const { result } = renderUseCart();

    act(() => {
      result.current.addToCart(mockProduct);
    });
    act(() => {
      result.current.removeFromCart(mockProduct);
    });

    expect(result.current.getItemCount()).toBe(0);
    expect(result.current.getItem(mockProduct)).toBeNull();
  });

  it("should decrement quantity when removing product with quantity > 1", () => {
    const { result } = renderUseCart();

    act(() => {
      result.current.addToCart(mockProduct);
    });
    act(() => {
      result.current.addToCart(mockProduct);
    });
    act(() => {
      result.current.removeFromCart(mockProduct);
    });

    expect(result.current.getItemCount()).toBe(1);
    const item = result.current.getItem(mockProduct);
    expect(item?.quantity).toBe(1);
  });

  it("should handle multiple different products", () => {
    const { result } = renderUseCart();
    const product2: Product = {
      ...mockProduct,
      id: 2,
      name: "Product 2",
    };

    act(() => {
      result.current.addToCart(mockProduct);
    });
    act(() => {
      result.current.addToCart(product2);
    });

    // getItemCount returns total quantity, which should be 2
    expect(result.current.getItemCount()).toBe(2);
    expect(result.current.getItem(mockProduct)?.quantity).toBe(1);
    expect(result.current.getItem(product2)?.quantity).toBe(1);
  });
});
