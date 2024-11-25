import React, { useState } from 'react';
import axios from 'axios';

const Document = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    country: '',
    attributes: '',
  });
  const [productData, setProductData] = useState([]);
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const result = await axios.post(
        'http://localhost:5000/api/documents/generate',
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
          responseType: 'json', // Expecting JSON response with product data
        }
      );

      // Ensure the response has a products array
      if (result.data && Array.isArray(result.data.products)) {
        setProductData(result.data.products);
        // Create a URL for the downloaded CSV file
        const fileURL = URL.createObjectURL(result.data.csvFile);
        setDownloadLink(fileURL);
      } else {
        setError('Invalid response format.');
      }
    } catch (err) {
      setError('Failed to generate the document.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Generate Document</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Product Type</label>
          <input
            type="text"
            name="productType"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Attributes</label>
          <input
            type="text"
            name="attributes"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate Document
        </button>
      </form>

      {productData.length > 0 && (
        <div className="mt-4">
          <h4>Generated Product Data:</h4>
          <div
            style={{
              maxHeight: '300px',
              overflowY: 'scroll',
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Type</th>
                  <th>Country</th>
                  <th>Attributes</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {productData.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.productType}</td>
                    <td>{product.country}</td>
                    <td>{product.attributes}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href={downloadLink} className="btn btn-success" download="demo_products.csv">
            Download CSV
          </a>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Document;
