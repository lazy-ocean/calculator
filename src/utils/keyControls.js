/* eslint-disable no-restricted-globals */
import OPERATIONS from "./operations";

const keyControls = (handleChange) => {
  event.preventDefault();
  const { key } = event;

  if (key === "Enter") handleChange(key, "res");

  if (/\d/.test(key)) {
    event.preventDefault();
    handleChange(parseInt(key, 10), "number");
  } else if (OPERATIONS.includes(key)) {
    event.preventDefault();
    handleChange(key, "operation");
  } else if (key === ".") {
    event.preventDefault();
    handleChange(key, "punctuation");
  } else if (key === "%") {
    event.preventDefault();
    handleChange(key, "special");
  } else if (key === "Backspace") {
    event.preventDefault();
    handleChange(key, "erase");
  } else if (key === "Clear") {
    event.preventDefault();
    handleChange(key, "abort");
  }
};

export default keyControls;
