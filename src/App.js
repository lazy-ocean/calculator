import "./App.css";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeOutUp } from "react-animations";

/*const fadingOutAnimation = keyframes`${fadeOutUp}`;
const FadingDiv = styled.div`
    animation: ${(current) =>
      current === "res" ? `1s ${fadingOutAnimation}` : "none"};
  `;*/

function App() {
  let [value, setValue] = useState("0");
  let [formula, setFormula] = useState("");
  let [error, setError] = useState(false);

  const handleValue = (v) => {
    let value = v.toString().substr(0, 9);
    setValue(value);
  };

  const handleChange = (v, role) => {
    switch (role) {
      case "operation":
        setFormula((formula += ` ${v} `));
        break;
      case "punctuation":
        handleValue((value += v));
        formula ? setFormula((formula += v)) : setFormula(`0${v}`);
        break;
      case "number":
        if (value.length >= 9) {
          setError(true);
          setFormula(formula);
        } else {
          setFormula((formula += v));
          handleValue(eval(formula));
        }
        break;
      case "abort":
        setError(false);
        setFormula("");
        setValue("0");
        break;
      case "special":
        if (v === "%") {
          setFormula((formula += v));
          let f = formula.split(" ");
          let percentage = (~~f[0] / 100) * f[2].slice(0, -1);
          handleValue(eval(`${f[0]}${f[1]}${percentage}`));
        } else if (v === "π") {
          setFormula((formula += "3.14159"));
        } else {
          setFormula((formula += "2.71828"));
        }
        break;
      case "res":
        setFormula(value);
        setValue("0");
        break;
      default:
        break;
    }
  };

  return (
    <div className="calc__body">
      <div className="panel">
        <div>{formula}</div>
        <div className="result">{value}</div>
        {error && (
          <p className="error">
            This number is too long for a handy calculator :(
          </p>
        )}
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            btn={btn}
            onClick={(v, role) => handleChange(v, role)}
          />
        ))}
      </div>
    </div>
  );
}

const buttons = [
  { value: "%", role: "special" },
  { value: "π", role: "special" },
  { value: "e", role: "special" },
  { value: "/", role: "operation" },
  { value: "7", role: "number" },
  { value: "8", role: "number" },
  { value: "9", role: "number" },
  { value: "x", role: "operation" },
  { value: "4", role: "number" },
  { value: "5", role: "number" },
  { value: "6", role: "number" },
  { value: "-", role: "operation" },
  { value: "1", role: "number" },
  { value: "2", role: "number" },
  { value: "3", role: "number" },
  { value: "+", role: "operation" },
  { value: "0", role: "number" },
  { value: ".", role: "punctuation" },
  { value: "=", role: "res" },
  { value: "C", role: "abort" },
];
/*let draft = (
  <div className="button">
    <p>{value}</p>
  </div>
);*/

const Button = (prop) => {
  let { btn, onClick } = prop;
  let value = btn.value === "x" ? "*" : btn.value;
  return (
    <button
      className={`button ${btn.role}`}
      onClick={() => onClick(value, btn.role)}
    >
      {btn.value}
    </button>
  );
};

export default App;
