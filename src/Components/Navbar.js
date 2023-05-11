import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import OutlinedCard from "./Components/Card";
import CISA from "../Pages/CISA";

const Navbar = () => {
  const [result, setResult] = useState([]);
  const [dataNVDTotal, setDataNVDTotal] = useState([]);
  const [dataCISATotal, setDataCISATotal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/api")
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
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
        var dataCISA = Array.from(sumYByYear, ([x, y]) => ({ x, y }));
        // sort dataCISA by year in ascending order
        dataCISA.sort((a, b) => a.x - b.x);
        setResult(dataCISA);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(result);

  useEffect(() => {
    fetch("/.netlify/functions/apiNVD")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setDataNVDTotal(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flexRow navbar">
      <Link to="/">
        <OutlinedCard
          title="CISA "
          description="Number of vulnerabilities:"
          subtitle={dataCISATotal ? ` ${dataCISATotal}` : "loading..."}
          subtitle2="vulnerabilities"
          buttonText="Learn More"
        />
      </Link>
      <Link to="/NVD">
        <OutlinedCard
          title="NVD "
          description="Number of vulnerabilities:"
          subtitle={
            dataNVDTotal.totalResults
              ? ` ${dataNVDTotal.totalResults}`
              : "loading..."
          }
          subtitle2="vulnerabilities"
          buttonText="Learn More"
        />
      </Link>
      <CISA result={result} loading={loading} />
    </div>
  );
};

export default Navbar;
