import React from "react";
import classNames from "classnames";
import "./buttons.css";

const Button = ({ btn, onClick }) => {
  const value = btn.value === "x" ? "*" : btn.value;
  const classList = classNames(btn.role, {
    button: true,
    long: btn.long,
  });
  return (
    <button
      type="button"
      data-testid={`btn-${btn.value}`}
      className={classList}
      onClick={() => onClick(value, btn.role)}
    >
      {btn.value}
    </button>
  );
};

export default Button;
