import React from "react";
import { Routes, Route } from "react-router-dom";
import CISA from "./Pages/CISA";
import NVD from "./Pages/NVD";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<CISA />} />
    <Route path="/NVD" element={<NVD />} />
  </Routes>
);

export default AppRoutes;
