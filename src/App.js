import "./App.css";
import React, { useEffect, useState } from "react";
import { evaluate, format } from "mathjs";
import classNames from "classnames";

function App() {
  let [value, setValue] = useState(0);
  let [formula, setFormula] = useState("");
  let [error, setError] = useState(false);
  let [state, setState] = useState("number");
  let [fadeOutIn, setFadeOutIn] = useState(false);

  let handleKeyDown = (event) => {
    event.preventDefault();
    let { key } = event;

    if (key === "Enter") handleChange(key, "res");

    if (/\d/.test(key)) {
      event.preventDefault();
      handleChange(parseInt(key, 10), "number");
    } else if (operations.includes(key)) {
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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleValue = (v) => {
    let fr = v.toString().split(".");
    let value = v;
    if (fr[1] && fr[1].length > 6) {
      value = format(value, 6);
      let arr = formula.split(" ");
      let num = Number(arr[arr.length - 1]);
      arr[arr.length - 1] = format(num, 6);
      setFormula(arr.join(" "));
    }
    if (value > 10000000) {
      setError("This number is too big for a handy calculator :(");
      value = value.toString().substr(0, 8);
    }
    setValue(value);
  };

  const handleChange = (v, role) => {
    setFadeOutIn(false);
    switch (role) {
      case "number":
        if (error) setError(false);
        if (value > 10000000) {
          setError("This number is too big for a handy calculator :(");
        } else {
          formula !== "0" ? setFormula((formula += v)) : setFormula(v);
          handleValue(evaluate(formula));
        }
        setState(role);
        break;
      case "operation":
        if (error) setError(false);
        if (state === "operation") {
          let temp = formula.slice(0, -2);
          setFormula((temp += ` ${v} `));
        } else {
          setFormula((formula += ` ${v} `));
        }
        setState(role);
        break;
      case "punctuation":
        if (state !== "number") return;
        let arr = formula.split(" ");
        if (isNaN(`${arr[arr.length - 1]}${v}`)) {
          setError("This is not a number");
        } else {
          setFormula((formula += v));
          handleValue(evaluate(formula));
        }
        setState(role);
        break;
      case "special":
        if (v === "%") {
          let f = formula.split(" ");
          if (f.length < 2) {
            let temp = format(evaluate(`0.01 * ${value}`), 6);
            handleValue(temp);
            setFormula(temp);
          } else {
            let percentage = (~~f[0] / 100) * f[2];
            let temp = evaluate(`${f[0]}${f[1]}${percentage}`);
            handleValue(temp);
            setFormula(`${f[0]} ${f[1]} ${percentage}`);
          }
          setState(role);
        } else if (v === "π") {
          if (isNaN(`${value}3.14159`)) {
            setError("This is not a number");
          } else {
            setFormula((formula += "3.14159"));
            handleValue(evaluate(formula));
          }
        } else {
          if (isNaN(`${value}2.71828`)) {
            setError("This is not a number");
          } else {
            setFormula((formula += "2.71828"));
            handleValue(evaluate(formula));
          }
        }
        break;
      case "res":
        setFadeOutIn(true);
        setTimeout(() => {
          setFormula(value);
          setValue("0");
        }, 250);
        break;
      case "abort":
        setFormula("");
        setValue("0");
        setError(false);
        break;
      case "erase":
        setError(false);
        let temp;
        if (
          formula[formula.length - 1] === " " ||
          operations.includes(formula[formula.length - 1])
        ) {
          temp = formula.slice(0, -3);
          setFormula(temp);
          handleValue(evaluate(temp));
          setState("number");
        } else {
          temp = formula.toString().slice(0, -1);
          if (!temp) {
            handleValue(0);
            setFormula("");
          } else {
            setFormula(temp);
          }
          try {
            handleValue(evaluate(temp));
          } catch (e) {}
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="calc__body">
      <div className="panel">
        <div className={classNames({ formula: true, fadeOutUp: fadeOutIn })}>
          {formula}
        </div>
        <div className={classNames("result", { fadeOutUp: fadeOutIn })}>
          {value}
        </div>
        {error && <p className="error">{error}</p>}
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

const operations = ["-", "+", "/", "*"];
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
  { value: "0", role: "number", long: true },
  { value: ".", role: "punctuation" },
  { value: "⌫", role: "erase" },
  { value: "C", role: "abort", long: true },
  { value: "=", role: "res" },
];
/*let draft = (
  <div className="button">
    <p>{value}</p>
  </div>
);*/

const Button = (prop) => {
  let { btn, onClick } = prop;
  let value = btn.value === "x" ? "*" : btn.value;
  let classList = classNames(btn.role, {
    button: true,
    long: btn.long,
  });
  return (
    <button className={classList} onClick={() => onClick(value, btn.role)}>
      {btn.value}
    </button>
  );
};

export default App;
