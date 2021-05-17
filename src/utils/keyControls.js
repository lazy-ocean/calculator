/* eslint-disable no-restricted-globals */
import OPERATIONS from "./operations";

const operationsMap = {
  ".": "punctuation",
  "%": "special",
  Backspace: "erase",
  Clear: "abort",
  Enter: "res",
};

const keyControls = (handleChange) => {
  event.preventDefault();
  const { key } = event;

  if (/\d/.test(key)) {
    handleChange(parseInt(key, 10), "number");
  } else if (OPERATIONS.includes(key)) {
    handleChange(key, "operation");
  } else {
    handleChange(key, operationsMap[key]);
  }
};

export default keyControls;
