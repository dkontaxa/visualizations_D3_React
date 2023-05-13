import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as d3 from "d3";
import CISA from "./Pages/CISA";
import NVD from "./Pages/NVD";

const AppRoutes = ({ setDataCISATotal }) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/api")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setDataCISATotal(jsonResponse.count);
        const dataJson = jsonResponse.vulnerabilities.map((vulnerability) => ({
          x: vulnerability.cveID.substr(4, 4),
          y: 1,
        }));
        const sumYByYear = d3.rollup(
          dataJson,
          (v) => d3.sum(v, (d) => d.y),
          (d) => d.x
        );
        const dataCISA = Array.from(sumYByYear, ([x, y]) => ({ x, y }));
        // sort dataCISA by year in ascending order
        dataCISA.sort((a, b) => a.x - b.x);
        setResult(dataCISA);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<CISA result={result} loading={loading} />} />
      <Route path="/NVD" element={<NVD />} />
    </Routes>
  );
};

export default AppRoutes;
