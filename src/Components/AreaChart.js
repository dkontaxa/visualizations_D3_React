import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const AreaChart = ({
  data,
  width,
  height,
  margin,
  timeAggregation = "month",
  timeFormat = "%Y-%m-%d",
  xValue = "x",
  yValue = "y",
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const parseDate = d3.timeParse(timeFormat);
    const formatDate = d3.timeFormat(
      timeAggregation === "year" ? "%Y" : "%Y-%m"
    );

    const timeAggregator =
      timeAggregation === "year"
        ? d3.timeYear
        : timeAggregation === "raw"
        ? null
        : d3.timeMonth;

    const xScale = timeAggregator
      ? d3
          .scaleTime()
          .domain(d3.extent(data, (d) => parseDate(d[xValue])))
          .range([margin.left, width - margin.right])
          .nice(timeAggregator)
      : d3
          .scaleBand()
          .domain(data.map((d) => d[xValue]))
          .range([margin.left, width - margin.right])
          .paddingInner(0.1)
          .paddingOuter(0.2);
    console.log(formatDate);
    console.log(xScale);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yValue])])
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale).tickFormat(formatDate);
    const yAxis = d3.axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    const area = d3
      .area()
      .x((d) => xScale(parseDate(d[xValue])))
      .y0(yScale(0))
      .y1((d) => yScale(d[yValue]));

    svg
      .select(".area")
      .datum(data)
      .attr("d", area)
      .attr("fill", "steelblue")
      .attr("opacity", 0.5);
  }, [
    data,
    width,
    height,
    margin,
    timeAggregation,
    timeFormat,
    xValue,
    yValue,
  ]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <g className="x-axis" />
      <g className="y-axis" />
      <path className="area" />
    </svg>
  );
};

export default AreaChart;
