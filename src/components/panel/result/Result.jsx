import React from "react";
import "./result.css";

const Result = ({ result, fadeOutUp }) => (
  <div data-testid="result" className={`result${fadeOutUp ? " fadeOutUp" : ""}`}>
    {result}
  </div>
);

export default Result;
