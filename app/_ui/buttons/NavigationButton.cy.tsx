import React from "react";
import NavigationButton from "./NavigationButton";

describe("<NavigationButton />", () => {
  it("should render with correct classes and text", () => {
    const buttonText = "Go Back";
    const customClass = "custom-class";
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(
      <NavigationButton className={customClass} onClick={onClickSpy}>
        {buttonText}
      </NavigationButton>
    );

    // Check if the button is rendered with correct text and classes
    cy.get("[data-testid=navigation-button]").should(
      "contain.text",
      buttonText
    );
    cy.get("[data-testid=navigation-button]").should("have.class", "pl-2");
    cy.get("[data-testid=navigation-button]").should("have.class", "pr-4");
    cy.get("[data-testid=navigation-button]").should("have.class", "pt-2");
    cy.get("[data-testid=navigation-button]").should("have.class", "pb-2");
    cy.get("[data-testid=navigation-button]").should("have.class", "text-xs");
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "rounded-lg"
    );
    cy.get("[data-testid=navigation-button]").should("have.class", "bg-card");
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "text-white"
    );
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "text-opacity-70"
    );
    cy.get("[data-testid=navigation-button]").should("have.class", "flex");
    cy.get("[data-testid=navigation-button]").should("have.class", "flex-row");
    cy.get("[data-testid=navigation-button]").should("have.class", "relative");
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "justify-center"
    );
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "items-center"
    );
    cy.get("[data-testid=navigation-button]").should("have.class", "w-fit");
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "cursor-pointer"
    );
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "transition-all"
    );
    cy.get("[data-testid=navigation-button]").should(
      "have.class",
      "hover:bg-zinc-800"
    );
    cy.get("[data-testid=navigation-button]").should("have.class", customClass);

    // Simulate a click event and verify the onClick handler is called
    cy.get("[data-testid=navigation-button]").click();
    cy.get("@onClickSpy").should("have.been.called");
  });

  it("should display back arrow image", () => {
    cy.mount(<NavigationButton>Go Back</NavigationButton>);

    // Check if the back arrow image is displayed
    cy.get("img[alt='BackArrow']").should("exist");
  });
});
