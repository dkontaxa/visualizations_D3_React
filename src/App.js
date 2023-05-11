import React, { useState, useEffect } from "react";
import AreaChart from "../src/Components/AreaChart";
import "./App.css";
import Routes from "./Routes";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
