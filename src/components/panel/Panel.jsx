import React from "react";
import Formula from "./formula/Formula";
import Result from "./result/Result";
import "./panel.css";

const Panel = ({ formula, fadeOutIn, result, error }) => (
  <div className="panel">
    <Formula formula={formula} fadeOutUp={fadeOutIn} />
    <Result result={result} fadeOutUp={fadeOutIn} />
    {error && (
      <p className="error" data-testid="error">
        {error}
      </p>
    )}
  </div>
);

export default Panel;
