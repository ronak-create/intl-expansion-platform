import React, { useState, useEffect } from "react";
import axios from "axios";
import Insights from "./Insights";
import { jsPDF } from "jspdf";
import "./css/targetcountrymarket.css";
// import "jspdf-autotable"; // Optional: for better table formatting in PDF

const TargetCountryMarket = () => {
  const [productData, setProductData] = useState(() => {
    const storedProductData = localStorage.getItem("productData");
    return storedProductData ? JSON.parse(storedProductData) : null;
  });

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/target-country-market/recent-product"
        );
        setProductData(response.data);
        localStorage.setItem("productData", JSON.stringify(response.data)); // Save to localStorage
      } catch (err) {
        setError("Error fetching product data");
      }
    };

    const fetchRecentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/target-country-market/recent-user"
        );
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data)); // Save to localStorage
      } catch (err) {
        setError("Error fetching user data");
      }
    };

    if (!productData) fetchRecentProduct(); // Fetch only if data is not in localStorage
    if (!userData) fetchRecentUser(); // Fetch only if data is not in localStorage

    setLoading(false); // Set loading to false after fetching or loading data
  }, [productData, userData]);

  // Function to download the content as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Target Country Market: Insights and Analytics", 10, 10);
    doc.setFontSize(12);

    doc.text("Product Details:", 10, 20);
    doc.text(`Product Name: ${productData?.productName || "N/A"}`, 10, 30);
    doc.text(`Category: ${productData?.productCategory || "N/A"}`, 10, 40);
    doc.text(`Description: ${productData?.productDescription || "N/A"}`, 10, 50);
    doc.text(`Price: $${productData?.productPrice || "N/A"}`, 10, 60);
    doc.text(`Quantity: ${productData?.productQuantity || "N/A"}`, 10, 70);
    doc.text(`Origin: ${productData?.productOrigin || "N/A"}`, 10, 80);

    doc.text("User Details:", 10, 100);
    doc.text(`User Name: ${userData?.username || "N/A"}`, 10, 110);
    doc.text(`Email: ${userData?.email || "N/A"}`, 10, 120);
    doc.text(`Role: ${userData?.role || "N/A"}`, 10, 130);

    doc.text("Government Rules:", 10, 150);
    doc.text(`GST registration is mandatory for import and sales of electronics.`, 10, 160);
    doc.text(`Import duties of 18% on electronic devices.`, 10, 170);
    doc.text(`Products must comply with Bureau of Indian Standards (BIS).`, 10, 180);

    doc.text("Tariffs and Taxes:", 10, 200);
    doc.text(`Import duty: 18% on electronic goods.`, 10, 210);
    doc.text(`GST: 18% Goods and Services Tax (GST) on electronics.`, 10, 220);
    doc.text(`Customs processing fees: 1.5% of the total invoice value.`, 10, 230);

    doc.text("Terms and Conditions for Transport:", 10, 250);
    doc.text(`All electronics must comply with BIS (Bureau of Indian Standards) certification.`, 10, 260);
    doc.text(`Products with lithium batteries must follow specific packaging and transport guidelines.`, 10, 270);
    doc.text(`No hazardous material should be included in the consignment.`, 10, 280);
    doc.text(`Goods must be declared for customs clearance at entry ports.`, 10, 290);

    doc.save("target-country-market-report.pdf");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Target Country Market: Insights and Analytics</h2>

      {/* Display Most Recent Product Data */}
      <div className="block box-shadow">
        <h3>Product Details</h3>
        {productData ? (
          <>
            <p><strong>Product Name:</strong> {productData.productName}</p>
            <p><strong>Category:</strong> {productData.productCategory}</p>
            <p><strong>Description:</strong> {productData.productDescription}</p>
            <p><strong>Price:</strong> ${productData.productPrice}</p>
            <p><strong>Quantity:</strong> {productData.productQuantity}</p>
            <p><strong>Origin:</strong> {productData.productOrigin}</p>
          </>
        ) : (
          <p>No product data available</p>
        )}
      </div>

      {/* Display Most Recent User Data */}
      <div className="block box-shadow">
        <h3>User Details</h3>
        {userData ? (
          <>
            <p><strong>User Name:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </>
        ) : (
          <p>No user data available</p>
        )}
      </div>

      {/* Government Rules */}
      <div className="block box-shadow">
        <h3>
          Government Rules for {productData.productCategory} in {productData.country}
        </h3>
        <p>GST registration is mandatory for import and sales of electronics.</p>
        <p>Import duties of 18% on electronic devices.</p>
        <p>Products must comply with Bureau of Indian Standards (BIS).</p>
      </div>

      {/* Insights */}
      <div className="block box-shadow">
        <Insights />
      </div>

      {/* Tariffs and Taxes */}
      <div className="block box-shadow">
        <h3>
          Tariffs and Taxes for {productData.productCategory} in {productData.country}
        </h3>
        <p>Import duty: 18% on electronic goods.</p>
        <p>GST: 18% Goods and Services Tax (GST) on electronics.</p>
        <p>Customs processing fees: 1.5% of the total invoice value.</p>
      </div>

      {/* Terms and Conditions */}
      <div className="block box-shadow">
        <h3>
          Terms and conditions for transport of {productData.productName} in{" "}
          {userData.country}
        </h3>
        <p>All electronics must comply with BIS (Bureau of Indian Standards) certification.</p>
        <p>Products with lithium batteries must follow specific packaging and transport guidelines.</p>
        <p>No hazardous material should be included in the consignment.</p>
        <p>Goods must be declared for customs clearance at entry ports.</p>
      </div>

      {/* Download PDF Button */}
      <div className="download-btn-container">
        <button className="download-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default TargetCountryMarket;
