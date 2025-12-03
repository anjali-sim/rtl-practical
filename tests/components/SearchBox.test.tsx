import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "../../src/components/SearchBox";

describe("SearchBox", () => {
  it("should render search input", () => {
    const mockOnChange = vi.fn();
    render(<SearchBox onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
  });

  it("should update input value when user types", async () => {
    const mockOnChange = vi.fn();
    render(<SearchBox onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    const user = userEvent.setup();
    await user.type(input, "test search");

    expect(input.value).toBe("test search");
  });

  it("should call onChange when Enter key is pressed with non-empty search term", async () => {
    const mockOnChange = vi.fn();
    render(<SearchBox onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search/i);
    const user = userEvent.setup();
    await user.type(input, "test");
    await user.keyboard("{Enter}");

    expect(mockOnChange).toHaveBeenCalledWith("test");
  });

  it("should not call onChange when Enter key is pressed with empty search term", async () => {
    const mockOnChange = vi.fn();
    render(<SearchBox onChange={mockOnChange} />);

    const user = userEvent.setup();
    await user.keyboard("{Enter}");

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("should not call onChange on other key presses", async () => {
    const mockOnChange = vi.fn();
    render(<SearchBox onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    const user = userEvent.setup();
    await user.type(input, "test");
    await user.keyboard("{a}");

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
