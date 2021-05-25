import React from "react";
import "./formula.css";

const Formula = ({ formula, fadeOutUp }) => (
  <div className={`formula${fadeOutUp ? " fadeOutUp" : ""}`}>{formula}</div>
);

export default Formula;
