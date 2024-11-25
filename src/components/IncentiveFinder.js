import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const IncentiveFinder = () => {
  const [market, setMarket] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [incentives, setIncentives] = useState([]);

  const findIncentives = () => {
    // Sample incentives data for demo
    const sampleIncentives = [
      "Tax Credits for Green Businesses",
      "Research & Development (R&D) Grants",
      "Export Subsidies",
      "Job Creation Subsidies",
      "Local Business Support Programs",
      "Investment Tax Credits",
      "Low-Interest Loans",
      "Energy Efficiency Rebates",
      "Small Business Grants",
      "Workforce Training Incentives"
    ];

    // Set the sample incentives in the state
    setIncentives(sampleIncentives);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Incentive Finder</h2>
      <div className="card p-4">
        <div className="form-group">
          <label className="font-weight-bold">Market</label>
          <input
            type="text"
            className="form-control"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            placeholder="Enter the market (e.g., Local, International)"
          />
        </div>
        <div className="form-group mt-3">
          <label className="font-weight-bold">Business Type</label>
          <input
            type="text"
            className="form-control"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="Enter the business type (e.g., Tech, Retail)"
          />
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={findIncentives}>
            Find Incentives
          </button>
        </div>
      </div>

      {incentives.length > 0 && (
        <div className="mt-4">
          <h4 className="text-center font-weight-bold">Available Incentives</h4>
          <div className="list-group">
            {incentives.map((incentive, index) => (
              <li key={index} className="list-group-item list-group-item-info">
                {incentive}
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncentiveFinder;
