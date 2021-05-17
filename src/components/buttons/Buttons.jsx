import React from "react";
import BUTTONS from "../../utils/buttonsHashMap";
import Button from "./Button";

const Buttons = ({ handleChange }) => (
  <div className="buttons">
    {BUTTONS.map((btn) => (
      <Button key={btn.value} btn={btn} onClick={(v, role) => handleChange(v, role)} />
    ))}
  </div>
);

export default Buttons;
