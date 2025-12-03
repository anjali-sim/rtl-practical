import { render, screen } from "@testing-library/react";
import { FieldError } from "react-hook-form";
import ErrorMessage from "../../src/components/ErrorMessage";

describe("ErrorMessage", () => {
  it("should not render when error is undefined", () => {
    const { container } = render(<ErrorMessage error={undefined} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("should render error message when error exists", () => {
    const error: FieldError = {
      type: "required",
      message: "This field is required",
      ref: { name: "email" } as never,
    };

    render(<ErrorMessage error={error} />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveTextContent("This field is required");
  });

  it("should have data-for attribute with field name", () => {
    const error: FieldError = {
      type: "invalid",
      message: "Invalid email",
      ref: { name: "email" } as never,
    };

    render(<ErrorMessage error={error} />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveAttribute("data-for", "email");
  });

  it("should render error message with correct text color", () => {
    const error: FieldError = {
      type: "validate",
      message: "Password too short",
      ref: { name: "password" } as never,
    };

    render(<ErrorMessage error={error} />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toHaveTextContent("Password too short");
  });
});
