import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/analytics/data");
        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error("Failed to fetch analytics data", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return <div>Loading Analytics...</div>;
  }

  // Prepare data for the bar chart
  const trendData = {
    labels: analytics.trends.map((trend) => trend.market),
    datasets: [
      {
        label: "Market Growth Rate (%)",
        data: analytics.trends.map((trend) => trend.growthRate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Market Analytics</h2>
      <div className="chart-container">
        <Bar
          data={trendData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;
