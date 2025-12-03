import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CancelOrderButton from "../../src/components/CancelOrderButton";

describe("CancelOrderButton", () => {
  it("should render cancel order button", () => {
    render(<CancelOrderButton />);

    const button = screen.getByRole("button", { name: /cancel order/i });
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when button is clicked", async () => {
    render(<CancelOrderButton />);

    const button = screen.getByRole("button", { name: /cancel order/i });
    const user = userEvent.setup();
    await user.click(button);

    // Dialog opens and shows confirmation message
    await screen.findByText(/are you sure you want to cancel this order/i);
    expect(
      screen.getByText(/are you sure you want to cancel this order/i)
    ).toBeInTheDocument();
  });

  it("should display confirm and deny buttons in dialog", async () => {
    render(<CancelOrderButton />);

    const button = screen.getByRole("button", { name: /cancel order/i });
    const user = userEvent.setup();
    await user.click(button);

    await screen.findByText(/are you sure you want to cancel this order/i);

    const buttons = screen.getAllByRole("button");
    const noButton = buttons.find((btn) => btn.textContent === "No");
    const yesButton = buttons.find((btn) => btn.textContent === "Yes");

    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
  });

  it("should display dialog title", async () => {
    render(<CancelOrderButton />);

    const button = screen.getByRole("button", { name: /cancel order/i });
    const user = userEvent.setup();
    await user.click(button);

    await screen.findByText("Confirm");
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
