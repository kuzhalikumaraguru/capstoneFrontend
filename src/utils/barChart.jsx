import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function barChart({ projects }) {
  const chartRef = useRef(null);
  useEffect(() => {
    const getLabels = () => {
      const labels = projects.map((e) => e.projectName);
      return labels;
    };
    const getData = () => {
      const values = projects.map(
        (e) => e.projectBudget.match(/^(\d+)([a-zA-Z]+)/)[1]
      );
      return values;
    };
    let chartInstance = null;
    if (chartRef.current !== null) {
      chartInstance = chartRef.current.chartInstance;
      if (chartInstance !== undefined) {
        chartInstance.destroy();
      }
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: "Approx Budget of the Project",
            data: getData(),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Budget (in lakhs)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Project Name",
            },
          },
        },
      },
    });
    // Ensure chart instance is destroyed when component unmounts
    return () => {
      if (chartInstance !== undefined) {
        chartInstance.destroy();
      }
    };
  }, [projects]);
  return (
    <div style={{ height: "317px", width: "634px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default barChart;
