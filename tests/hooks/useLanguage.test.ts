import { renderHook } from "@testing-library/react";
import useLanguage from "../../src/hooks/useLanguage";
import { LanguageProvider } from "../../src/providers/language/LanguageProvider";
import React from "react";

describe("useLanguage", () => {
  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) =>
      React.createElement(LanguageProvider, { language: "en", children });
  };

  it("should return language context", () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toBeDefined();
    expect(result.current.currentLanguage).toBeDefined();
  });

  it("should have default language", () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: createWrapper(),
    });

    expect(result.current.currentLanguage).toBe("en");
  });

  it("should throw error when used outside LanguageProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useLanguage());
    }).toThrow();

    consoleSpy.mockRestore();
  });
});
