import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CISA from "./Pages/CISA";
import NVD from "./Pages/NVD";

const AppRoutes = () => {
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

export default AppRoutes;
