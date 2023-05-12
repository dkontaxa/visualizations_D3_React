import React from "react";
import Navbar from "./Components/Navbar";
import { Router, Routes } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CISA />} />
        <Route path="/NVD" element={<NVD />} />
      </Routes>
    </Router>
  );
};

export default Routes;
