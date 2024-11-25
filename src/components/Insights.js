import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Spinner, Alert, Card } from "react-bootstrap";
import iso3166 from "iso-3166-1-alpha-2"; // Import country code library

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [country, setTargetCountry] = useState("");
  const [keywords, setKeywords] = useState("");

  const token = localStorage.getItem("token");
  const date = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

  // Fetch product and country data from recent-product API
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:5000/api/target-country-market/recent-product",
          {
            headers: { Authorization: `${token}` },
          }
        );

        const { productName, country } = response.data;

        // Convert country name to ISO alpha-2 code
        const countryNameToCode = {
          India: "IN", // ISO Alpha-2 code for India
          USA: "US", // ISO Alpha-2 code for the United States
          Canada: "CA", // Add more as needed
        };

        const convertToISOCode = (country) => {
          return countryNameToCode[country] || null;
        };
        const countryCode = convertToISOCode(country.trim());
        if (!countryCode) {
          setError("Invalid country name received.");
          setTargetCountry("");
        } else {
          setTargetCountry(countryCode);
        }

        setKeywords(productName || "N/A");
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Unable to fetch product and country data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [token]);

  // Fetch insights based on the target country, keywords, and date
  useEffect(() => {
    const fetchInsights = async () => {
      if (!country || !keywords) return;

      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/market-insights/trends?country=${country}&keywords=${keywords}&date=${date}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );
        setInsights(response.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
        setInsights(null);
        setError("Unable to fetch insights at this time.");
      } finally {
        setLoading(false);
      }
    };

    if (country && keywords) {
      fetchInsights();
    }
  }, [country, keywords, date, token]);

  const getChartData = () => {
    if (!insights || !insights.trends) return { labels: [], datasets: [] };

    const labels = insights.trends.map((trend) => trend.date);
    const data = insights.trends.map((trend) => trend.value[0]);

    return {
      labels,
      datasets: [
        {
          label: "Popularity Trend",
          data,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.4,
          fill: false,
        },
      ],
    };
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Market Insights</h2>

      {/* Error handling */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display details */}
      <div className="mb-4">
        <h5>Target Country: {country || "N/A"}</h5>
        <h5>Keywords: {keywords || "N/A"}</h5>
        <h5>Date: {date}</h5>
      </div>

      {/* Display market insights graph */}
      {insights && insights.trends && insights.trends.length > 0 ? (
        <Card className="shadow mb-3">
          <Card.Body>
            <h5 className="card-title">Market Trends</h5>
            <div style={{ height: "400px", width: "100%" }}>
              <Line data={getChartData()} />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <div className="text-center">
          <p>No insights available for the selected criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Insights;
