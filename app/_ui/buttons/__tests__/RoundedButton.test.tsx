import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RoundedButton from "../RoundedButton";

describe("RoundedButton", () => {
  it("renders the button with the provided content", () => {
    const buttonText = "Click me";
    render(<RoundedButton>{buttonText}</RoundedButton>);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the provided className to the button", () => {
    const customClassName = "custom-button";
    render(<RoundedButton className={customClassName}>Button</RoundedButton>);
    const buttonElement = screen.getByText("Button");
    expect(buttonElement).toHaveClass(customClassName);
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    render(<RoundedButton onClick={onClickMock}>Button</RoundedButton>);
    const buttonElement = screen.getByText("Button");
    buttonElement.click();
    expect(onClickMock).toHaveBeenCalled();
  });
});
