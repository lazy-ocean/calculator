import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "../App";

test("initial state", () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId("result")).toHaveTextContent(0);
});

test("click on digit", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("4"));
  expect(getByTestId("result")).toHaveTextContent(4);
  expect(getByTestId("formula")).toHaveTextContent(4);
});

test("click on operation", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("-"));
  expect(getByTestId("result")).toHaveTextContent("0");
  expect(getByTestId("formula")).toHaveTextContent("-");
  fireEvent.click(screen.getByText("3"));
  expect(getByTestId("result")).toHaveTextContent("-3");
  expect(getByTestId("formula")).toHaveTextContent("- 3");
});

test("click on result", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("="));
  expect(getByTestId("result")).toHaveTextContent("7");
  expect(getByTestId("formula")).toHaveTextContent("3 + 4");
});

test("click on erase left", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("0"));
  expect(getByTestId("result")).toHaveTextContent("43");
  fireEvent.click(screen.getByText("⌫"));
  expect(getByTestId("formula")).toHaveTextContent("3 + 4");
  expect(getByTestId("result")).toHaveTextContent("7");
});

test("click on erase all", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("4"));
  fireEvent.click(screen.getByText("C"));
  expect(getByTestId("formula")).toBeEmptyDOMElement();
  expect(getByTestId("result")).toHaveTextContent("0");
});

test("percentage from number", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("3"));
  fireEvent.click(screen.getByText("%"));
  expect(getByTestId("result")).toHaveTextContent("0.03");
});

test("percentage decrease", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("-"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("%"));
  expect(getByTestId("result")).toHaveTextContent("8");
});

test("pi", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("π"));
  expect(getByTestId("result")).toHaveTextContent("3.14159");
  expect(getByTestId("formula")).toHaveTextContent("3.14159");
});

test("error not a number", () => {
  const { getByTestId } = render(<App />);
  fireEvent.click(screen.getByText("π"));
  fireEvent.click(screen.getByText("."));
  expect(getByTestId("error")).toBeInTheDocument();
});

test("error number is too big", () => {
  const { getByTestId } = render(<App />);
  let num = 6;
  while (num) {
    fireEvent.click(screen.getByTestId("btn-9"));
    num -= 1;
  }
  expect(getByTestId("error")).toBeInTheDocument();
});
