import React from "react";
import RoundedButton from "./RoundedButton";

describe("<RoundedButton />", () => {
  it("renders and should render the correct value", () => {
    const onClickSpy = cy.spy().as("onClickSpy");
    cy.mount(
      <RoundedButton data-testid="counter" onClick={onClickSpy}>
        Button
      </RoundedButton>
    );
    cy.get("[data-testid=counter]").should("have.text", "Button");
    cy.get("[data-testid=counter]").click();

    cy.get("@onClickSpy").should("have.been.calledOnce");
  });
});
