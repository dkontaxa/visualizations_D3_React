import React, { useState, useEffect } from "react";
import lakePowellData from "../src/Data/LakePowellStorageVolume.json";
import AreaChart from "../src/Components/AreaChart";
import LineChart from "../src/Components/LineChart";
import * as d3 from "d3";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(true);
  var handleEditButtonClick = () => {
    setFormSubmitted(!formSubmitted);
  };

  useEffect(() => {
    setData(lakePowellData.data);
    fetch("/.netlify/functions/api")
      .then((response) => response.json())
      .then((jsonResponse) => {
        const dataJson = jsonResponse.vulnerabilities.map((vulnerability) => ({
          x: vulnerability.dateAdded,
          y: 1,
        }));
        const sumYByYear = d3.rollup(
          dataJson,
          (v) => d3.sum(v, (d) => d.y),
          (d) => d.x.substring(0, 4)
        );
        var dataCISA = Array.from(sumYByYear, ([x, y]) => ({ x, y }));
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
        <div className="width40 pointer" onClick={handleEditButtonClick}>
          Storage Volume by Year
        </div>
        <div className="width40 pointer" onClick={handleEditButtonClick}>
          Storage Volume all time
        </div>
      </div>
      {formSubmitted === true ? (
        result.length > 0 ? (
          <AreaChart
            data={result}
            width={1000}
            height={300}
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
          data={data}
          width={1000}
          height={300}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        />
      )}
    </div>
  );
};

export default App;
