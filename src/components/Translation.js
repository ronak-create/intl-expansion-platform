import React, { useState } from "react";
import axios from "axios";

const Translation = ({ text }) => {
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/documents/translate", {
        text,
        targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Target Language</label>
        <input
          type="text"
          className="form-control"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        />
      </div>
      <button className="btn btn-secondary" onClick={translateText}>
        Translate
      </button>
      {translatedText && (
        <div className="mt-3">
          <h5>Translated Text</h5>
          <pre>{translatedText}</pre>
        </div>
      )}
    </div>
  );
};

export default Translation;
