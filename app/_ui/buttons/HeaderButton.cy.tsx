import React from "react";
import HeaderButton from "./HeaderButton";

describe("<HeaderButton />", () => {
  it("should render and apply classes correctly", () => {
    const buttonText = "Click Me";
    const customClass = "custom-class";
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(
      <HeaderButton className={customClass} onClick={onClickSpy}>
        {buttonText}
      </HeaderButton>
    );

    // Check if the button is rendered with correct text
    cy.get("button").should("have.text", buttonText);

    // Check if the button has the correct initial classes
    cy.get("button").should("have.class", "bg-zinc-900");
    cy.get("button").should("have.class", "text-white");
    cy.get("button").should("have.class", "font-bold");
    cy.get("button").should("have.class", "py-2");
    cy.get("button").should("have.class", "px-4");
    cy.get("button").should("have.class", "rounded");

    // Check if the button has the custom class
    cy.get("button").should("have.class", customClass);

    // Simulate a click event and verify the onClick handler is called
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.called");
  });

  it("should apply hover class on mouseover", () => {
    const buttonText = "Hover Me";
    cy.mount(<HeaderButton>{buttonText}</HeaderButton>);

    // Check if the hover class is applied on mouseover
    cy.get("button")
      .trigger("mouseover")
      .should("have.class", "hover:bg-zinc-700");
  });
});
