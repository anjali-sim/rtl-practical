import { render } from "@testing-library/react";
import Layout from "../../src/pages/Layout";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Providers from "../../src/providers";

describe("Layout", () => {
  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        BrowserRouter,
        {},
        React.createElement(Providers, {}, children)
      );
  };

  it("should render layout without crashing", () => {
    render(<Layout />, { wrapper: createWrapper() });

    expect(document.body).toBeInTheDocument();
  });

  it("should have main structure", () => {
    const { container } = render(<Layout />, { wrapper: createWrapper() });

    expect(container).toBeInTheDocument();
  });
});
