import React, { useState, useEffect } from "react";
import * as d3 from "d3";

const Heatmap = ({ reqData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const processed = reqData.map((item, index) => {
      let obj = {};
      obj.x = index;
      obj.y = index + 1;
      return { ...item, ...obj };
    });
    setData(processed);
  }, []);

  useEffect(() => {
    const svg = d3.select("#heatmap");
    const width = 600;
    const height = 520;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const xScale = d3
      .scaleBand()
      .domain([...Array(10).keys()])
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain([...Array(10).keys()])
      .range([0, height]);

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateViridis)
      .domain([0, 1]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x) + margin.left)
      .attr("y", (d) => yScale(d.y) + margin.top)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", (d) => colorScale(d.value))
      .on("mouseover", (event, d) => {
        d3.select("#tooltip")
          .style("display", "block")
          .html(
            `Value: ${d.QC_cell_count.toFixed(2)}
                 Given: ${d.Metadata_Well} 
                 Disp_Value : ${d.QC_cov_failed}`
          )
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("display", "none");
      });

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.top + innerHeight})`
      )
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", margin.bottom / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("X Axis Label");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Y Axis Label");
  }, [data]);

  return (
    <div className="upload_section">
      <h2>Heat Map Chart</h2>
      <svg id="heatmap" width={500} height={500}></svg>
      <div
        id="tooltip"
        style={{
          display: "none",
          position: "absolute",
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid black",
        }}
      ></div>
    </div>
  );
};

export default Heatmap;
