import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";

describe("HomePage", () => {
  const renderHome = () => {
    return render(
      <LanguageProvider language="en">
        <HomePage />
      </LanguageProvider>
    );
  };

  it("should render home page title", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /home page/i })
    ).toBeInTheDocument();
  });

  it("should render label component", async () => {
    renderHome();

    await waitFor(() => {
      // The Label component should render with the welcome label
      expect(screen.getByText(/welcome|bienvenido/i)).toBeInTheDocument();
    });
  });

  it("should render without crashing", () => {
    const { container } = renderHome();

    expect(container).toBeInTheDocument();
  });
});
