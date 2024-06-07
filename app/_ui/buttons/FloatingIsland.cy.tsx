import React from "react";
import FloatingIsland from "./FloatingIsland";

describe("<FloatingIsland />", () => {
  it("should renders island text and onclick should work", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(<FloatingIsland islandText={"hello"} onClick={onClickSpy} />);
    cy.get("[data-testid=floating-island]").should("have.text", "hello");

    cy.get("[data-testid=arrow-button]").click();

    cy.get("[data-testid=floating-island]").within(() => {
      cy.get("div").eq(0).should("have.class", "show-word");
      cy.get("h1").should("have.class", "show-word");
    });

    cy.get("@onClickSpy").should("have.been.calledOnce");
  });

  it("should not render text and icon if island text is empty", () => {
    const onClickSpy = cy.spy().as("onClickSpy");

    cy.mount(<FloatingIsland islandText={""} onClick={onClickSpy} />);
    cy.get("[data-testid=floating-island]").within(() => {
      cy.get("div").eq(0).should("have.class", "hide-icon");
      cy.get("h1").should("have.class", "hide-word");
    });
  });
});
