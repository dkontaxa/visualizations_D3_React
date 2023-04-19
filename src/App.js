import React, { useState, useEffect } from "react";
import AreaChart from "../src/Components/AreaChart";
import LineChart from "../src/Components/LineChart";
import * as d3 from "d3";
import "./App.css";
import OutlinedCard from "./Components/Card";

const App = () => {
  const [result, setResult] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(true);
  var handleEditButtonClick = () => {
    setFormSubmitted(!formSubmitted);
  };

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
          title="CISA "
          subtitle={`Number of vulnerabilities: ${result.length}`}
          description="well meaning and kindly."
          buttonText="Learn More"
        />{" "}
      </div>
      {formSubmitted === true ? (
        result.length > 0 ? (
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
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <LineChart
          data={result}
          width={1000}
          height={300}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          timeFormat="%m"
          timeAggregation="%m"
          xValue="x"
          yValue="y"
        />
      )}
    </div>
  );
};

export default App;
