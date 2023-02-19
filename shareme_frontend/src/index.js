import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

// ReactDOM.render(<App />, document.getElementById("root"));

// ---REACT-17---

// ReactDOM.render(
//   //   <Router>
//   <App />,
//   //   </Router>,
//   document.getElementById("root")
// );

// ---REACT-18---
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <App tab="home" />
  </BrowserRouter>
);
