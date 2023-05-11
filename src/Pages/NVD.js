import React, { useState, useEffect } from "react";
// import AreaChart from "../src/Components/AreaChart";
import "./App.css";

const NVD = () => {
  const [result, setResult] = useState([]);

  // useEffect(() => {
  //   fetch("/.netlify/functions/apiNVD")
  //     .then((response) => response.json())
  //     .then((jsonResponse) => {
  //       setResult(jsonResponse);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  // console.log(result);

  return (
    <div className="App">
      <h1>This is NVD page</h1>
    </div>
  );
};

export default NVD;
