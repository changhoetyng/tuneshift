import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeaderButton from "../HeaderButton";

describe("HeaderButton", () => {
  it("renders the button with the provided content", () => {
    const buttonText = "Click me";
    render(<HeaderButton>{buttonText}</HeaderButton>);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the provided className to the button", () => {
    const customClassName = "custom-button";
    render(<HeaderButton className={customClassName}>Button</HeaderButton>);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass(customClassName);
  });
});
