import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Goals({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = data.map(([label, { total }]) => ({
      label,
      total,
    }));
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svgElement = d3.select(chartRef.current).select("svg");
    let svg;
    if (svgElement.empty()) {
      svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    } else {
      svg = svgElement.select("g");
      svg.selectAll("*").remove();
    }

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(chartData.map((d) => d.label));
    y.domain([0, d3.max(chartData, (d) => d.total)]);

    const line = d3
      .line()
      .x((d) => x(d.label) + x.bandwidth() / 2)
      .y((d) => y(d.total))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(chartData)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    svg
      .selectAll(".dot")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.label) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.total))
      .attr("r", 4)
      .attr("fill", "steelblue");

    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").attr("class", "axis").call(d3.axisLeft(y));
  }, [data]);

  return (
    <div>
      <h1>Season Goal Difference Chart</h1>
      <div ref={chartRef}></div>
    </div>
  );
}

Goals.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Goals;
