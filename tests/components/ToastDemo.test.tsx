import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import ToastDemo from "../../src/components/ToastDemo";

vi.mock("react-hot-toast");

describe("ToastDemo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render button with Show Toast text", () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    expect(button).toBeInTheDocument();
  });

  it("should have btn class on button", () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    expect(button).toHaveClass("btn");
  });

  it("should call toast.success when button is clicked", async () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(toast.success).toHaveBeenCalledWith("Success");
  });

  it("should call toast.success once on single click", async () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(toast.success).toHaveBeenCalledTimes(1);
  });

  it("should call toast.success with correct message", async () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(toast.success).toHaveBeenCalledWith("Success");
    expect(toast.success).not.toHaveBeenCalledWith("Error");
  });

  it("should call toast.success multiple times on multiple clicks", async () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    const user = userEvent.setup();

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(toast.success).toHaveBeenCalledTimes(3);
  });

  it("button should be clickable", async () => {
    render(<ToastDemo />);

    const button = screen.getByRole("button", { name: /Show Toast/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalled();
  });
});
