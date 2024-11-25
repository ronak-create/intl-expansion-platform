import React, { useState } from "react";
import axios from "axios";

const DocumentGenerator = () => {
  const [templateId, setTemplateId] = useState("");
  const [inputData, setInputData] = useState({});
  const [generatedDocument, setGeneratedDocument] = useState("");

  const generateDocument = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/documents/generate", {
        templateId,
        inputData,
      });
      setGeneratedDocument(response.data.document);
    } catch (error) {
      console.error("Document generation failed", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Document Generator</h2>
      <div className="form-group">
        <label>Template ID</label>
        <input
          type="text"
          className="form-control"
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Input Data (JSON format)</label>
        <textarea
          className="form-control"
          rows="5"
          value={JSON.stringify(inputData)}
          onChange={(e) => setInputData(JSON.parse(e.target.value))}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={generateDocument}>
        Generate Document
      </button>
      <div className="mt-4">
        {generatedDocument && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Generated Document</h5>
              <pre>{generatedDocument}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentGenerator;
