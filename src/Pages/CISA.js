import React, { useState, useEffect } from "react";
import AreaChart from "../src/Components/AreaChart";
import "./App.css";

const CISA = ({ loading, result }) => {
  return (
    <div className="App">
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

export default CISA;
