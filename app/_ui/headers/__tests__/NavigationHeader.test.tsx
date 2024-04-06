import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavigationHeader from "../NavigationHeader";

describe("NavigationHeader", () => {
  it("renders the header with correct elements", async () => {
    const jsx = await NavigationHeader();
    render(jsx);

    // Assert that the TuneShift logo is rendered
    const tuneShiftLogo = screen.getByAltText("TuneShift Logo");
    expect(tuneShiftLogo).toBeInTheDocument();

    // Assert that the GitHub logo is rendered
    const githubLogo = screen.getByAltText("Github Logo");
    expect(githubLogo).toBeInTheDocument();
  });

  it("renders navigation links correctly", async () => {
    const jsx = await NavigationHeader();
    render(jsx);

    // Assert that the Home link is rendered
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();

    // Assert that the Home link is rendered
    const migrateToAppleMusic = screen.getByText("Migrate to Apple Music");
    expect(migrateToAppleMusic).toBeInTheDocument();

    // Assert that the About link is rendered
    const aboutLink = screen.getByText("About me");
    expect(aboutLink).toBeInTheDocument();
  });

  it("navigates to the correct page when a link is clicked", async () => {
    const jsx = await NavigationHeader();
    render(jsx);

    const homeLink = screen.getByText("Home");
    homeLink.click();

    expect(window.location.pathname).toBe("/");
  });
});
