import { render, screen } from "@testing-library/react";
import QuantitySelector from "../../src/components/QuantitySelector";
import userEvent from "@testing-library/user-event";
import { useCart } from "../../src/hooks/useCart";
import { Product } from "../../src/entities";

vi.mock("../../src/hooks/useCart");

describe("QuantitySelector", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    price: 10,
    categoryId: 1,
  };

  it("should render Add to Cart button when item not in cart", () => {
    const mockGetItem = vi.fn(() => null);
    const mockAddToCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
    } as unknown as ReturnType<typeof useCart>);

    render(<QuantitySelector product={mockProduct} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  it("should call addToCart when Add to Cart button is clicked", async () => {
    const mockGetItem = vi.fn(() => null);
    const mockAddToCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
    } as unknown as ReturnType<typeof useCart>);

    render(<QuantitySelector product={mockProduct} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    const user = userEvent.setup();
    await user.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("should render quantity controls when item is in cart", () => {
    const mockGetItem = vi.fn(() => ({ quantity: 2 }));
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    } as unknown as ReturnType<typeof useCart>);

    render(<QuantitySelector product={mockProduct} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("should call removeFromCart when minus button is clicked", async () => {
    const mockGetItem = vi.fn(() => ({ quantity: 2 }));
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    } as unknown as ReturnType<typeof useCart>);

    render(<QuantitySelector product={mockProduct} />);

    const minusButton = screen.getByRole("button", { name: "-" });
    const user = userEvent.setup();
    await user.click(minusButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct);
  });

  it("should call addToCart when plus button is clicked", async () => {
    const mockGetItem = vi.fn(() => ({ quantity: 2 }));
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();

    vi.mocked(useCart).mockReturnValue({
      getItem: mockGetItem,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    } as unknown as ReturnType<typeof useCart>);

    render(<QuantitySelector product={mockProduct} />);

    const plusButton = screen.getByRole("button", { name: "+" });
    const user = userEvent.setup();
    await user.click(plusButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
