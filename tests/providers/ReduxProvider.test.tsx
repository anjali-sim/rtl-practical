import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../src/providers/ReduxProvider";

describe("ReduxProvider", () => {
  it("should render children", () => {
    render(
      <ReduxProvider>
        <div>Test Content</div>
      </ReduxProvider>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should provide Redux store to children", () => {
    const { container } = render(
      <ReduxProvider>
        <div>Test</div>
      </ReduxProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
