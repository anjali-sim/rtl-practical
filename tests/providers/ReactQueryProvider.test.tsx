import { render, screen } from "@testing-library/react";
import ReactQueryProvider from "../../src/providers/ReactQueryProvider";

describe("ReactQueryProvider", () => {
  it("should render children", () => {
    render(
      <ReactQueryProvider>
        <div>Test Content</div>
      </ReactQueryProvider>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should provide QueryClient to children", () => {
    const { container } = render(
      <ReactQueryProvider>
        <div>Test</div>
      </ReactQueryProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
