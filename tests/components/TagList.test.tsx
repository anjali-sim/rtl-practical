import { render, screen, waitFor } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  it("should render empty list initially", () => {
    const { container } = render(<TagList />);

    const list = container.querySelector("ul");
    expect(list).toBeEmptyDOMElement();
  });

  it("should render tags after loading completes", async () => {
    render(<TagList />);

    await waitFor(() => {
      expect(screen.getByText("tag1")).toBeInTheDocument();
      expect(screen.getByText("tag2")).toBeInTheDocument();
      expect(screen.getByText("tag3")).toBeInTheDocument();
    });
  });

  it("should render all tags as list items", async () => {
    render(<TagList />);

    await waitFor(() => {
      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(3);
      expect(listItems[0]).toHaveTextContent("tag1");
      expect(listItems[1]).toHaveTextContent("tag2");
      expect(listItems[2]).toHaveTextContent("tag3");
    });
  });

  it("should render tags in correct order", async () => {
    render(<TagList />);

    await waitFor(() => {
      const tags = screen.getAllByRole("listitem");
      expect(tags[0]).toHaveTextContent("tag1");
      expect(tags[1]).toHaveTextContent("tag2");
      expect(tags[2]).toHaveTextContent("tag3");
    });
  });
});
