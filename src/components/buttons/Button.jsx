import React from "react";
import classNames from "classnames";

const Button = ({ btn, onClick }) => {
  const value = btn.value === "x" ? "*" : btn.value;
  const classList = classNames(btn.role, {
    button: true,
    long: btn.long,
  });
  return (
    <button type="button" className={classList} onClick={() => onClick(value, btn.role)}>
      {btn.value}
    </button>
  );
};

export default Button;
