import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import MainPageWelcomeText from "../MainPageWelcomeText";

describe("MainPageWelcomeText", () => {
  it("renders the welcome text correctly", async () => {
    render(<MainPageWelcomeText text="Hello" className="custom-class" />);

    await waitFor(
      () => {
        const buttonElement = screen.getByText("Hello");
        expect(buttonElement).toBeInTheDocument();
      },
      { timeout: 1400 }
    );
  });
});
