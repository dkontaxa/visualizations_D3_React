import React from "react";
import "./App.css";
import AppRoutes from "./Routes";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
