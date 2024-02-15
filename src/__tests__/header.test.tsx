import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("Header", () => {
  render(<Header />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Takip" })
  ).toBeDefined();
});
