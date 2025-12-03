import { render, screen } from "@testing-library/react";
import Label from "../../src/components/Label";
import useLanguage from "../../src/hooks/useLanguage";

vi.mock("../../src/hooks/useLanguage");

describe("Label", () => {
  it("should render label with translated text", () => {
    const mockGetLabel = vi.fn((id: string) => {
      const labels: Record<string, string> = {
        welcome: "Welcome",
        goodbye: "Goodbye",
      };
      return labels[id] || id;
    });

    vi.mocked(useLanguage).mockReturnValue({
      getLabel: mockGetLabel,
    } as unknown as ReturnType<typeof useLanguage>);

    render(<Label labelId="welcome" />);

    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });

  it("should call getLabel with correct labelId", () => {
    const mockGetLabel = vi.fn(() => "Test Label");
    vi.mocked(useLanguage).mockReturnValue({
      getLabel: mockGetLabel,
    } as unknown as ReturnType<typeof useLanguage>);

    render(<Label labelId="test_key" />);

    expect(mockGetLabel).toHaveBeenCalledWith("test_key");
  });

  it("should render label for different ids", () => {
    const mockGetLabel = vi.fn((id: string) => {
      const labels: Record<string, string> = {
        email: "Email Address",
        password: "Password",
      };
      return labels[id] || id;
    });

    vi.mocked(useLanguage).mockReturnValue({
      getLabel: mockGetLabel,
    } as unknown as ReturnType<typeof useLanguage>);

    render(<Label labelId="email" />);

    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });
});
