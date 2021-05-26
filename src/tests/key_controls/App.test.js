import { render, fireEvent } from "@testing-library/react";
import React from "react";
import App from "../../App";

test("keypress", () => {
  const { getByTestId } = render(<App />);
  fireEvent.keyDown(getByTestId("result"), { key: "9", code: "Digit9" });
  expect(getByTestId("result")).toHaveTextContent(9);
});

test("right formula with keypresses", () => {
  const { getByTestId } = render(<App />);
  fireEvent.keyDown(getByTestId("result"), { key: "9", code: "Digit9" });
  expect(getByTestId("result")).toHaveTextContent(9);
  fireEvent.keyDown(getByTestId("result"), { key: "-", code: "Minus" });
  fireEvent.keyDown(getByTestId("result"), { key: "4", code: "Digit4" });
  expect(getByTestId("formula")).toHaveTextContent("9 - 4");
});

test("right result with keypresses", () => {
  const { getByTestId } = render(<App />);
  fireEvent.keyDown(getByTestId("result"), { key: "8", code: "Digit9" });
  fireEvent.keyDown(getByTestId("result"), { key: "-", code: "Minus" });
  fireEvent.keyDown(getByTestId("result"), { key: "4", code: "Digit4" });
  expect(getByTestId("result")).toHaveTextContent(4);
});
