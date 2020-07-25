import React from "react";
import ReactDOM from "react-dom";
import TypoBase from "../components/TypoBase";
import "./app.styl";
function App() {
  return (
    <TypoBase variant="h1" color="primary">Page - <small>Index</small></TypoBase>
  );
};
ReactDOM.render(
  <App />,
  document.getElementById("app"),
);