import React from "react";
import ReactDOM from "react-dom";
import Counter from "./counter";
import MemoryGame from "./MemoryGame";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return <MemoryGame />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
