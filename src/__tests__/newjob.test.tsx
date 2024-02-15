import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import NewJob from "../components/NewJob";

describe("New Job Test Suite", () => {
  test("Title is defined", () => {
    render(<NewJob />);
    expect(screen.getByText("Create New Job")).toBeDefined();
  });
});
