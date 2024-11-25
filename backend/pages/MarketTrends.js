import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const MarketTrends = () => {
  const [region, setRegion] = useState("global");
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetchTrends();
  }, [region]);

  const fetchTrends = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/market-insights/trends/${region}`);
      setTrends(response.data.trends);
    } catch (error) {
      console.error("Failed to fetch market trends", error);
    }
  };

  const data = {
    labels: trends.map((trend) => trend.topic),
    datasets: [
      {
        label: "Popularity",
        data: trends.map((trend) => trend.popularity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Market Trends</h2>
      <div className="form-group">
        <label>Region</label>
        <select
          className="form-control"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="global">Global</option>
          <option value="north-america">North America</option>
          <option value="europe">Europe</option>
        </select>
      </div>
      <div className="mt-4">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default MarketTrends;
