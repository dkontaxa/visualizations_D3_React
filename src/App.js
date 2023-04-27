import React, { useState, useEffect } from "react";
import AreaChart from "../src/Components/AreaChart";
import * as d3 from "d3";
import "./App.css";
import OutlinedCard from "./Components/Card";

const App = () => {
  const [result, setResult] = useState([]);
  const [dataNVD, setDataNVD] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/api")
      .then((response) => response.json())
      .then((jsonResponse) => {
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
        setDataNVD(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="flexRow navbar">
        <OutlinedCard
          title="CISA "
          description="Number of vulnerabilities:"
          subtitle={result.length ? ` ${result.length}` : "loading..."}
          buttonText="Learn More"
        />
        <OutlinedCard
          title="NVD "
          description="Number of vulnerabilities:"
          subtitle={
            dataNVD.totalResults ? ` ${dataNVD.totalResults}` : "loading..."
          }
          buttonText="Learn More"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AreaChart
          data={result}
          width={500}
          height={200}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          timeFormat="%Y"
          timeAggregation="year"
          xValue="x"
          yValue="y"
        />
      )}
    </div>
  );
};

export default App;
