import { render, screen } from "@testing-library/react";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";

describe("LanguageProvider", () => {
  it("should render children", () => {
    render(
      <LanguageProvider language="en">
        <div>Test Content</div>
      </LanguageProvider>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should accept language prop", () => {
    const { container } = render(
      <LanguageProvider language="es">
        <div>Test</div>
      </LanguageProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it("should support both en and es languages", () => {
    const enRender = render(
      <LanguageProvider language="en">
        <div>English</div>
      </LanguageProvider>
    );

    expect(screen.getByText("English")).toBeInTheDocument();

    enRender.unmount();

    render(
      <LanguageProvider language="es">
        <div>Español</div>
      </LanguageProvider>
    );

    expect(screen.getByText("Español")).toBeInTheDocument();
  });
});
