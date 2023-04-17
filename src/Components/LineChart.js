import React, { useState } from "react";
import * as d3 from "d3";

const LineChart = ({
  data,
  margin,
  width,
  height,
  style,
  timeFormat,
  timeAggregation,
  xValue,
  yValue,
}) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Get years from the fetch data
  const years = Array.from(
    new Set(
      data.map((d) => {
        const parsedDate = d3.timeParse(timeFormat)(d[xValue]);
        return parsedDate ? parsedDate.getFullYear() : null;
      })
    )
  );

  // Filter data by selected year
  const filteredData = selectedYear
    ? data.filter((d) => {
        const parsedDate = d3.timeParse(timeFormat)(d[xValue]);
        return parsedDate ? parsedDate.getFullYear() === selectedYear : false;
      })
    : data;

  // Define x and y scales
  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(filteredData, (d) => d3.timeParse(timeFormat)(d[xValue])),
      d3.max(filteredData, (d) => d3.timeParse(timeFormat)(d[xValue])),
    ])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(filteredData, (d) => d[yValue])])
    .range([height - margin.bottom, margin.top]);

  // Define line function
  const line = d3
    .line()
    .x((d) => xScale(d3.timeParse(timeFormat)(d[xValue])))
    .y((d) => yScale(d[yValue]));

  return (
    <div style={style}>
      <select
        placeholder="Select a Year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        <option value={null}>All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            d={line(filteredData)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <g transform={`translate(0,${height - margin.bottom})`}>
            <g
              ref={(node) => {
                const axis = d3
                  .axisBottom(xScale)
                  .tickFormat(d3.timeFormat(timeAggregation));
                d3.select(node).call(axis);
              }}
            />
          </g>
          <g transform={`translate(${margin.left},0)`}>
            <g
              ref={(node) => {
                const axis = d3.axisLeft(yScale);
                d3.select(node).call(axis);
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
