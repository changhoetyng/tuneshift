import React from "react";
import LongRoundedButton from "./LongRoundedButton";

describe("<LongRoundedButton />", () => {
  it("should render with correct text and classes", () => {
    const buttonText = "Click Me";
    const customClass = "custom-class";
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(
      <LongRoundedButton className={customClass} onClick={onClickSpy}>
        {buttonText}
      </LongRoundedButton>
    );

    // Check if the button is rendered with correct text and classes
    cy.get("button").should("have.text", buttonText);
    cy.get("button").should("have.class", "rounded-lg");
    cy.get("button").should("have.class", "bg-secondary");
    cy.get("button").should("have.class", "border");
    cy.get("button").should("have.class", "text-white");
    cy.get("button").should("have.class", "flex");
    cy.get("button").should("have.class", "justify-between");
    cy.get("button").should("have.class", "items-center");
    cy.get("button").should("have.class", customClass);

    // Simulate a click event and verify the onClick handler is called
    cy.get("button").click();
    cy.get("@onClickSpy").should("have.been.called");
  });

  it("should apply disabled styles and prevent click", () => {
    const buttonText = "Disabled Button";
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(
      <LongRoundedButton disabled={true} onClick={onClickSpy}>
        {buttonText}
      </LongRoundedButton>
    );

    // Check if the button has disabled styles
    cy.get("button").should("have.class", "opacity-50");
    cy.get("button").should("have.class", "cursor-not-allowed");

    // Verify the onClick handler is not called when button is disabled
    cy.get("button").click();
    cy.get("@onClickSpy").should("not.have.been.called");
  });

  it("should show arrow icon when showArrow is true", () => {
    const buttonText = "Button with Arrow";

    cy.mount(
      <LongRoundedButton showArrow={true}>{buttonText}</LongRoundedButton>
    );

    // Check if the arrow icon is displayed
    cy.get("button").find("img[alt='RightArrow']").should("exist");
  });

  it("should not show arrow icon when showArrow is false", () => {
    const buttonText = "Button without Arrow";

    cy.mount(
      <LongRoundedButton showArrow={false}>{buttonText}</LongRoundedButton>
    );

    // Check if the arrow icon is not displayed
    cy.get("button").find("img[alt='RightArrow']").should("not.exist");
  });
});
