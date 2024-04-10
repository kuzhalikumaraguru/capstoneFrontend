import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart({ users }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chartInstance = null;
    // Function to create or update the chart
    const createOrUpdateChart = () => {
      if (chartInstance !== null) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }

      const getUserType = (type) => {
        switch (type) {
          case 1:
            return "Super Admin";
          case 2:
            return "Admin";
          case 3:
            return "Manager";
          case 4:
            return "Site Engineer";
          case 5:
            return "Client";
          case 6:
            return "Labour";
        }
      };
      // Count the occurrences of each user type
      const userTypeCounts = users.reduce((acc, user) => {
        acc[getUserType(user.userType)] =
          (acc[getUserType(user.userType)] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(userTypeCounts);
      const data = Object.values(userTypeCounts);
      const ctx = chartRef.current.getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8A2BE2",
                "#7AD3BE",
                "#4B006E", // Add more colors if needed
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8A2BE2",
                "#7AD3BE",
                "#4B006E", // Add more colors if needed
              ],
            },
          ],
        },
      });
    };
    // Call the function to create or update the chart
    createOrUpdateChart();
    // Ensure chart instance is destroyed when component unmounts or when data changes
    return () => {
      if (chartInstance !== null) {
        chartInstance.destroy();
      }
    };
  }, [users]);

  return (
    <div style={{ height: "317px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default PieChart;
