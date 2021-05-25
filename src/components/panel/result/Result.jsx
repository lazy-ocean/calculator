import React from "react";
import "./result.css";

const Formula = ({ result, fadeOutUp }) => (
  <div className={`result${fadeOutUp ? " fadeOutUp" : ""}`}>{result}</div>
);

export default Formula;
