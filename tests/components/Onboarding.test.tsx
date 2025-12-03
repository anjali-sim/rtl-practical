import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Onboarding from "../../src/components/Onboarding";

describe("Onboarding", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render welcome message when tutorial is not completed", () => {
    render(<Onboarding />);

    expect(screen.getByText("Welcome to our app!")).toBeInTheDocument();
    expect(
      screen.getByText("Complete the tutorial to get started.")
    ).toBeInTheDocument();
  });

  it("should render Mark Tutorial as Completed button when tutorial is not completed", () => {
    render(<Onboarding />);

    const button = screen.getByRole("button", {
      name: /Mark Tutorial as Completed/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("should show welcome back message when tutorial is already completed", () => {
    localStorage.setItem("tutorialCompleted", "true");

    render(<Onboarding />);

    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText("You've already completed the tutorial.")
    ).toBeInTheDocument();
  });

  it("should not show button when tutorial is already completed", () => {
    localStorage.setItem("tutorialCompleted", "true");

    render(<Onboarding />);

    const button = screen.queryByRole("button", {
      name: /Mark Tutorial as Completed/i,
    });
    expect(button).not.toBeInTheDocument();
  });

  it("should update localStorage when button is clicked", async () => {
    render(<Onboarding />);

    const button = screen.getByRole("button", {
      name: /Mark Tutorial as Completed/i,
    });
    const user = userEvent.setup();

    await user.click(button);

    expect(localStorage.getItem("tutorialCompleted")).toBe("true");
  });

  it("should change view after marking tutorial as completed", async () => {
    render(<Onboarding />);

    const button = screen.getByRole("button", {
      name: /Mark Tutorial as Completed/i,
    });
    const user = userEvent.setup();

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Welcome back!")).toBeInTheDocument();
      expect(
        screen.getByText("You've already completed the tutorial.")
      ).toBeInTheDocument();
    });
  });

  it("should hide the button after marking tutorial as completed", async () => {
    render(<Onboarding />);

    const button = screen.getByRole("button", {
      name: /Mark Tutorial as Completed/i,
    });
    const user = userEvent.setup();

    await user.click(button);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Mark Tutorial as Completed/i })
      ).not.toBeInTheDocument();
    });
  });
});
