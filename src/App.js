/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-globals */
import "./App.css";
import React, { useEffect, useState } from "react";
import { evaluate, format } from "mathjs";
import OPERATIONS from "./utils/operations";
import MESSAGES from "./utils/messages";
import keyControls from "./utils/keyControls";
import Buttons from "./components/buttons/Buttons";
import Panel from "./components/panel/Panel";

function App() {
  const [result, setResult] = useState(0);
  // eslint-disable-next-line prefer-const
  let [formula, setFormula] = useState("");
  const [error, setError] = useState(false);
  const [state, setState] = useState("number");
  const [fadeOutIn, setFadeOutIn] = useState(false);

  // eslint-disable-next-line consistent-return
  const handleValue = (expression) => {
    if (!expression) {
      return setResult(0);
    }
    try {
      let value = format(evaluate(expression), 6);
      const fractions = value.toString().split(".");
      if (fractions[1] && fractions[1].length > 6) {
        // To round only the last entered number
        const arr = formula.split(" ");
        const num = Number(arr[arr.length - 1]);
        arr[arr.length - 1] = format(num, 6);
        setFormula(arr.join(" "));
        setError(MESSAGES.MESSAGE_ROUND);
      }
      if (value > 10000000) {
        setError(MESSAGES.ERROR_BIG_NUMBER);
        value = value.toString().substr(0, 8);
      }
      setResult(value);
    } catch (e) {
      // TODO: modal
    }
  };

  const handleChange = (value, role) => {
    setFadeOutIn(false);
    if (error) setError(false);
    switch (role) {
      case "number":
        if (result > 10000000) {
          setError(MESSAGES.ERROR_BIG_NUMBER);
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
          setError(MESSAGES.ERROR_NAN);
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
            setError(MESSAGES.ERROR_NAN);
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
        const erasedSymbol = formula[formula.length - 1];
        if (erasedSymbol === " " || OPERATIONS.includes(erasedSymbol)) {
          temp = formula.slice(0, -3);
          setState("number");
        } else {
          temp = formula.toString().slice(0, -1);
          if (!temp) handleValue(0);
        }
        setFormula(temp);
        handleValue(temp);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const onKeyDown = ({ key }) => keyControls(key, handleChange);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="calc__body">
      <Panel result={result} formula={formula} fadeOutIn={fadeOutIn} error={error} />
      <Buttons handleChange={handleChange} />
    </div>
  );
}

export default App;
