import React, { useState, useEffect } from "react";
import lakePowellData from "../src/Data/LakePowellStorageVolume.json";
import AreaChart from "../src/Components/AreaChart";
import LineChart from "../src/Components/LineChart";
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
    fetch(`https://reactd3visualizations.netlify.app/.netlify/functions/api`).then(
      response => response.json()
    ).then(jsonResponse => setResult(jsonResponse.data));
    console.log(result);
  }, []);
  console.log(data);

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
        <AreaChart
          data={data}
          width={1000}
          height={300}
          margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
          timeAggregation="year"
          timeFormat="%Y"
        />
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
