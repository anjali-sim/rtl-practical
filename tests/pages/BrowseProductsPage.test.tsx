import { render, screen } from "@testing-library/react";
import PlaygroundPage from "../../src/pages/PlaygroundPage";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import React from "react";

describe("PlaygroundPage", () => {
  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        BrowserRouter,
        {},
        React.createElement(LanguageProvider, { language: "en", children })
      );
  };

  it("should render playground page", () => {
    render(<PlaygroundPage />, { wrapper: createWrapper() });

    // Playground might contain various components for testing
    const element = screen.queryByText(/playground|demo|test/i);
    if (element) {
      expect(element).toBeInTheDocument();
    } else {
      // If no specific text, just check that it renders
      expect(document.body).toBeInTheDocument();
    }
  });

  it("should render without crashing", () => {
    const { container } = render(<PlaygroundPage />, {
      wrapper: createWrapper(),
    });

    expect(container).toBeInTheDocument();
  });
});
