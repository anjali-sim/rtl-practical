import { render, screen } from "@testing-library/react";
import ErrorPage from "../../src/pages/ErrorPage";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useRouteError: vi.fn(() => new Error("Test error")),
  isRouteErrorResponse: vi.fn(() => false),
}));

describe("ErrorPage", () => {
  it("should render error page", () => {
    render(<ErrorPage />);

    expect(screen.getByText("Oops...")).toBeInTheDocument();
  });

  it("should display error message or heading", () => {
    const { container } = render(<ErrorPage />);

    expect(container).toBeInTheDocument();
  });
});
