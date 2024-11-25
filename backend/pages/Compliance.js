import React, { useState } from "react";
import axios from "axios";

const Compliance = () => {
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [regulations, setRegulations] = useState([]);

  const fetchRegulations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/regulations/${country}/${industry}`
      );
      setRegulations(response.data);
    } catch (error) {
      console.error("Failed to fetch regulations", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Compliance Checklist</h2>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Industry</label>
        <input
          type="text"
          className="form-control"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={fetchRegulations}>
        Get Compliance Checklist
      </button>
      <div className="mt-4">
        {regulations.length > 0 ? (
          <ul className="list-group">
            {regulations.map((reg, index) => (
              <li key={index} className="list-group-item">
                {reg.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No regulations found. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Compliance;
