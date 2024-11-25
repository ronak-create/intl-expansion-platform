import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RiskAssessment = () => {
  const [market, setMarket] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [riskData, setRiskData] = useState(null);

  const calculateRisk = () => {
    // Static risk data for demo purposes
    const sampleRiskData = {
      operational: Math.random() * 100, // Random risk value between 0 and 100
      financial: Math.random() * 100,  // Random risk value between 0 and 100
      regulatory: Math.random() * 100, // Random risk value between 0 and 100
    };

    // Set the sample risk data in the state
    setRiskData(sampleRiskData);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Risk Assessment</h2>
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
          <button className="btn btn-primary" onClick={calculateRisk}>
            Calculate Risk
          </button>
        </div>
      </div>

      {riskData && (
        <div className="mt-4">
          <h4 className="text-center font-weight-bold">Risk Data</h4>
          <div className="list-group">
            <li className="list-group-item list-group-item-warning">
              <strong>Operational Risk:</strong> {riskData.operational.toFixed(2)}%
            </li>
            <li className="list-group-item list-group-item-danger">
              <strong>Financial Risk:</strong> {riskData.financial.toFixed(2)}%
            </li>
            <li className="list-group-item list-group-item-info">
              <strong>Regulatory Risk:</strong> {riskData.regulatory.toFixed(2)}%
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;
