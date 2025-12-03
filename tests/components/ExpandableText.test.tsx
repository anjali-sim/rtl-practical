import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  it("should render the full text if less than 255 characters", () => {
    const text = "Short text";
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate text if longer than 255 characters", () => {
    const text = "hello".repeat(256);
    render(<ExpandableText text={text} />);

    const truncatedText = text.substring(0, 255) + "...";
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when Show More button is clicked", async () => {
    const text = "hello".repeat(256);
    render(<ExpandableText text={text} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

    it("should collapse text when Show Less button is clicked", async () => {
    const text = "hello".repeat(256);
    const truncatedText = text.substring(0, 255) + "...";
    render(<ExpandableText text={text} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    await user.click(button);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
