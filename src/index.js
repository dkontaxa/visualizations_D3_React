import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);
