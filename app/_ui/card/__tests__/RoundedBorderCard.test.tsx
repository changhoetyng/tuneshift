import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoundedBorderCard from "../RoundedBorderCard";

describe("RoundedBorderCard", () => {
  it("renders the header and children correctly", () => {
    const headerText = "Test Header";
    const contentText = "Test Content";

    const { getByText } = render(
      <RoundedBorderCard header={headerText}>{contentText}</RoundedBorderCard>
    );

    const headerElement = getByText(headerText);
    const contentElement = getByText(contentText);

    expect(headerElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  it("applies the provided classNames correctly", () => {
    const customClassName = "custom-card";
    const customContentClassName = "custom-content";
    const customHeaderClassName = "custom-header";

    const { container } = render(
      <RoundedBorderCard
        className={customClassName}
        contentClassName={customContentClassName}
        headerClassName={customHeaderClassName}
      >
        Test Content
      </RoundedBorderCard>
    );

    const cardElement = container.firstChild;

    expect(cardElement).toHaveClass(customClassName);
    expect(cardElement?.firstChild).toHaveClass(customContentClassName);
  });
});
