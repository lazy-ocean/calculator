/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-globals */
import "./App.css";
import React, { useEffect, useState } from "react";
import { evaluate, format } from "mathjs";
import classNames from "classnames";
import OPERATIONS from "./utils/operations";
import keyControls from "./utils/keyControls";
import Buttons from "./components/buttons/Buttons";

function App() {
  const [result, setResult] = useState(0);
  // eslint-disable-next-line prefer-const
  let [formula, setFormula] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState("number");
  const [fadeOutIn, setFadeOutIn] = useState(false);

  const handleValue = (expression) => {
    try {
      let value = evaluate(expression);
      const fractions = value.toString().split(".");
      if (fractions[1] && fractions[1].length > 6) {
        // To round only the last entered number
        value = format(value, 6);
        const arr = formula.split(" ");
        const num = Number(arr[arr.length - 1]);
        arr[arr.length - 1] = format(num, 6);
        setFormula(arr.join(" "));
        setError("Your number is rounded");
      }
      if (value > 10000000) {
        setError("This number is too big for a handy calculator :(");
        value = value.toString().substr(0, 8);
      }
      setResult(value);
    } catch (e) {
      // TODO: modal
      setError("Something went wrong");
    }
  };

  const handleChange = (value, role) => {
    setFadeOutIn(false);
    if (error) setError(false);
    switch (role) {
      case "number":
        if (result > 10000000) {
          setError("This number is too big for a handy calculator :(");
        } else {
          formula !== "0" ? setFormula((formula += value)) : setFormula(value);
          handleValue(formula);
        }
        setState(role);
        break;
      case "operation":
        if (state === "operation") {
          let temp = formula.slice(0, -2);
          setFormula((temp += ` ${value} `));
        } else {
          setFormula((formula += ` ${value} `));
        }
        setState(role);
        break;
      case "punctuation": {
        if (state !== "number") return;
        const arr = formula.split(" ");
        if (Number.isNaN(`${arr[arr.length - 1]}${value}`)) {
          setError("This is not a number");
        } else {
          setFormula((formula += value));
          handleValue(formula);
        }
        setState(role);
        break;
      }
      case "special":
        if (value === "%") {
          const formulaArray = formula.split(" ");
          if (formulaArray.length < 2) {
            /// УВАГА
            const temp = format(evaluate(`0.01 * ${result}`), 6);
            handleValue(temp);
            setFormula(temp);
          } else {
            const percentage = (parseInt(formulaArray[0], 10) / 100) * formulaArray[2];
            const formulaString = `${formulaArray[0]}${formulaArray[1]}${percentage}`;
            handleValue(formulaString);
            setFormula(formulaString);
          }
          setState(role);
        } else if (value === "π" || value === "e") {
          if (isNaN(`${result}3.1`)) {
            setError("This is not a number");
          } else {
            value === "π" ? setFormula((formula += "3.14159")) : setFormula((formula += "2.71828"));
            handleValue(formula);
          }
        }
        break;
      case "res":
        setFadeOutIn(true);
        setTimeout(() => {
          setFormula(result);
          setResult("0");
        }, 250);
        break;
      case "abort":
        setFormula("");
        setResult("0");
        setError(false);
        break;
      case "erase": {
        setError(false);
        let temp;
        if (
          formula[formula.length - 1] === " " ||
          OPERATIONS.includes(formula[formula.length - 1])
        ) {
          temp = formula.slice(0, -3);
          setFormula(temp);
          handleValue(temp);
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
            handleValue(temp);
          } catch (e) {
            setError("Something went wrong");
          }
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", () => {
      keyControls(handleChange);
    });
    return () => {
      document.removeEventListener("keydown", () => {
        keyControls(handleChange);
      });
    };
  });

  return (
    <div className="calc__body">
      <div className="panel">
        <div className={classNames({ formula: true, fadeOutUp: fadeOutIn })}>{formula}</div>
        <div className={classNames("result", { fadeOutUp: fadeOutIn })}>{result}</div>
        {error && <p className="error">{error}</p>}
      </div>
      <Buttons handleChange={handleChange} />
    </div>
  );
}

export default App;
