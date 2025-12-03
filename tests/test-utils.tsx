import { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";

// Custom render function that wraps components with Theme provider
const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => {
  return rtlRender(ui, {
    wrapper: ({ children }) => <Theme>{children}</Theme>,
    ...options,
  });
};

// Re-export commonly used utilities
export { render };
export * from "@testing-library/react";
