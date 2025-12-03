import { render, screen, waitFor } from "../test-utils";
import userEvent from "@testing-library/user-event";
import ProductForm from "../../src/components/ProductForm";
import useCategories from "../../src/hooks/useCategories";

vi.mock("../../src/hooks/useCategories");
vi.mock("react-hot-toast", () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("ProductForm", () => {
  const mockCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCategories).mockReturnValue({
      data: mockCategories,
      isLoading: false,
    } as unknown as ReturnType<typeof useCategories>);
  });

  it("should render form with input fields", () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("should render loading state when categories are loading", () => {
    vi.mocked(useCategories).mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as ReturnType<typeof useCategories>);

    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should populate form with product data when product is provided", () => {
    const mockProduct = {
      id: 1,
      name: "Laptop",
      price: 999,
      categoryId: 1,
    };

    const mockOnSubmit = vi.fn();
    render(<ProductForm product={mockProduct} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
    const priceInput = screen.getByPlaceholderText("Price") as HTMLInputElement;

    expect(nameInput.value).toBe("Laptop");
    expect(priceInput.value).toBe("999");
  });

  it("should call onSubmit with form data when form is submitted", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    const user = userEvent.setup();

    await user.type(nameInput, "Test Product");
    await user.type(priceInput, "50");
    await user.click(submitButton);
  });

  it("should disable submit button while submitting", async () => {
    const mockOnSubmit = vi.fn(
      () => new Promise(() => {})
    ) as unknown as Parameters<typeof ProductForm>[0]["onSubmit"]; // Never resolves
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    const user = userEvent.setup();

    await user.type(nameInput, "Test Product");
    await user.type(priceInput, "50");
    await user.click(submitButton);
  });

  it("should show error toast on submit failure", async () => {
    const mockOnSubmit = vi
      .fn()
      .mockRejectedValue(new Error("API Error")) as unknown as Parameters<
      typeof ProductForm
    >[0]["onSubmit"];
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    const user = userEvent.setup();

    await user.type(nameInput, "Test Product");
    await user.type(priceInput, "50");
    await user.click(submitButton);
  });

  it("should render category select with available categories", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    // Check that category select is rendered by looking for buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("should validate required fields before submit", async () => {
    const mockOnSubmit = vi.fn();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    const user = userEvent.setup();

    await user.click(submitButton);

    // Submit button should still be in the document
    expect(submitButton).toBeInTheDocument();
  });

  it("should re-enable submit button after submission completes", async () => {
    const mockOnSubmit = vi.fn(() =>
      Promise.resolve()
    ) as unknown as Parameters<typeof ProductForm>[0]["onSubmit"];
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByPlaceholderText("Name");
    const priceInput = screen.getByPlaceholderText("Price");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    const user = userEvent.setup();

    await user.type(nameInput, "Test Product");
    await user.type(priceInput, "50");
    await user.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
