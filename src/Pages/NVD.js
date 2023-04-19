import React, { useState, useEffect } from "react";
import AreaChart from "../src/Components/AreaChart";
import * as d3 from "d3";
import "./App.css";
import OutlinedCard from "./Components/Card";

const NVD = () => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/apiNVD")
      .then((response) => response.json())
      .then((jsonResponse) => {
        setResult(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(result);

  return (
    <div className="App">
      <div className="flexRow navbar">
        <OutlinedCard
          title=" "
          subtitle={`Number of vulnerabilities: ${result.length}`}
          description="well meaning and kindly."
          buttonText="Learn More"
        />
      </div>
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
    </div>
  );
};

export default NVD;
