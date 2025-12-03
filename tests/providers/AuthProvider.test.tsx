import { render, screen } from "@testing-library/react";
import AuthProvider from "../../src/providers/AuthProvider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import * as auth0 from "@auth0/auth0-react";

vi.mock("@auth0/auth0-react");

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock environment variables
    import.meta.env.VITE_AUTH0_DOMAIN = "test-domain.auth0.com";
    import.meta.env.VITE_AUTH0_CLIENTID = "test-client-id";
  });

  it("should throw error when Auth0 is not configured", () => {
    import.meta.env.VITE_AUTH0_DOMAIN = "";
    import.meta.env.VITE_AUTH0_CLIENTID = "";

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <div>Test</div>
          </AuthProvider>
        </BrowserRouter>
      );
    }).toThrow("Auth0 is not configured");

    consoleSpy.mockRestore();
  });

  it("should render children when configured properly", () => {
    const mockAuth0Provider = ({ children }: { children: React.ReactNode }) =>
      React.createElement("div", { "data-testid": "auth0-provider" }, children);

    vi.mocked(auth0.Auth0Provider).mockImplementation(
      mockAuth0Provider as unknown as typeof auth0.Auth0Provider
    );

    render(
      <BrowserRouter>
        <AuthProvider>
          <div>Test Content</div>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
