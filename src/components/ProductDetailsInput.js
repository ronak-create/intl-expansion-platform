import React, { useState } from "react";
import axios from "axios";

const ProductDetailsInput = ({ onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productOrigin, setProductOrigin] = useState("");
  const [country, setCountry] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productCategory", productCategory);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("productQuantity", productQuantity);
    formData.append("productOrigin", productOrigin);
    formData.append("country", country);
    formData.append("targetMarket", targetMarket);
    if (productImage) {
      formData.append("productImage", productImage);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/product/details", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Necessary for sending files
            "Authorization": `${token}`
          },
        }
      );
      console.log("Product details submitted successfully:", response.data);
      onSubmit(); // Trigger onSubmit from parent to update state in Dashboard
    } catch (error) {
      console.error("Error submitting product details:", error);
    }
  };
  return (
    <div className="product-form-container">
      <h2 className="form-title">Enter Product Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Category</label>
          <input
            type="text"
            className="form-control"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Description</label>
          <textarea
            className="form-control"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Price (USD)</label>
          <input
            type="number"
            className="form-control"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Quantity</label>
          <input
            type="number"
            className="form-control"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Origin (Country)</label>
          <input
            type="text"
            className="form-control"
            value={productOrigin}
            onChange={(e) => setProductOrigin(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Country of Export</label>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Target Market</label>
          <input
            type="text"
            className="form-control"
            value={targetMarket}
            onChange={(e) => setTargetMarket(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-submit">
          Submit Product Details
        </button>
      </form>
    </div>
  );
};

export default ProductDetailsInput;