import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render no image urls when the imageUrls array is empty", () => {
    const result = render(<ProductImageGallery imageUrls={[]} />);

    expect(result.container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const imageUrls = ["url1", "url2"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "url1");
    expect(images[1]).toHaveAttribute("src", "url2");
  });
});
