import { render, screen } from "@testing-library/react";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import CategoryList from "../../src/components/CategoryList";
import categoryReducer from "../../src/store/categorySlice";

interface CategoryState {
  list: Array<{ id: number; name: string }>;
  loading: boolean;
  error: string | null;
}

interface ExtendedRenderOptions {
  preloadedState?: PreloadedState<{ category: CategoryState }>;
  store?: ReturnType<typeof configureStore>;
}

function renderWithRedux(
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { category: categoryReducer },
      preloadedState,
    }),
  }: ExtendedRenderOptions = {}
) {
  return render(<Provider store={store}>{component}</Provider>);
}

vi.mock("../../src/store/categorySlice", async () => {
  const actual = await vi.importActual("../../src/store/categorySlice");
  return {
    ...actual,
    fetchCategories: vi.fn(() => ({ type: "categories/fetch" })),
  };
});

describe("CategoryList", () => {
  it("should render loading state initially", () => {
    const preloadedState = {
      category: {
        list: [],
        loading: true,
        error: null,
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render categories list when loaded", () => {
    const preloadedState = {
      category: {
        list: [
          { id: 1, name: "Electronics" },
          { id: 2, name: "Books" },
        ],
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("should render error message when error occurs", () => {
    const preloadedState = {
      category: {
        list: [],
        loading: false,
        error: "Failed to fetch categories",
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("should render category heading", () => {
    const preloadedState = {
      category: {
        list: [],
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    expect(screen.getByText("Category List")).toBeInTheDocument();
  });

  it("should render categories as list items", () => {
    const preloadedState = {
      category: {
        list: [
          { id: 1, name: "Category 1" },
          { id: 2, name: "Category 2" },
          { id: 3, name: "Category 3" },
        ],
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it("should render category links correctly", () => {
    const preloadedState = {
      category: {
        list: [{ id: 1, name: "Phones" }],
        loading: false,
        error: null,
      },
    };

    renderWithRedux(<CategoryList />, { preloadedState });

    expect(screen.getByText("Phones")).toBeInTheDocument();
  });
});
