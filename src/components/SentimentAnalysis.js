import React, { useState } from "react";
import axios from "axios";

const SentimentAnalysis = () => {
  const [feedback, setFeedback] = useState("");
  const [sentiment, setSentiment] = useState(null);

  const analyzeFeedback = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/market-insights/sentiment", {
        feedback,
      });
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error("Sentiment analysis failed", error);
    }
  };

  return (
    <div>
      <h2>Sentiment Analysis</h2>
      <textarea
        className="form-control"
        rows="4"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter market feedback"
      ></textarea>
      <button className="btn btn-primary mt-3" onClick={analyzeFeedback}>
        Analyze Sentiment
      </button>
      {sentiment && (
        <div className="mt-4">
          <h5>Analysis Result</h5>
          <pre>{JSON.stringify(sentiment, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;
