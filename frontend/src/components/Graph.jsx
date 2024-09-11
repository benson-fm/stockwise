// src/SentimentChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SentimentChart = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Parse date
    const parseDate = d3.timeParse("%Y-%m-%d");
    
    // Set up scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => parseDate(d.day)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.sentiment) - 0.1, d3.max(data, d => d.sentiment) + 0.1])
      .range([height, 0]);

    // Define the line
    const line = d3.line()
      .x(d => xScale(parseDate(d.day)))
      .y(d => yScale(d.sentiment));

    // Clear any previous content
    svg.selectAll('*').remove();

    // Draw the line
    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    // Draw the dots
    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(parseDate(d.day)))
      .attr('cy', d => yScale(d.sentiment))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width - 10)
      .attr('y', -10)
      .attr('text-anchor', 'end')
      .attr('fill', 'black')
      .text('Date');

    // Add y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('x', 10)
      .attr('y', 10)
      .attr('text-anchor', 'start')
      .attr('fill', 'black')
      .text('Sentiment');

  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}>
      <style>
        {`
          .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 2px;
          }
          .dot {
            fill: steelblue;
          }
        `}
      </style>
    </svg>
  );
};

export default SentimentChart;
