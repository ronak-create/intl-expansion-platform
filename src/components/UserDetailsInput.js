import React, { useState } from "react";
import axios from "axios";

const UserDetailsInput = ({ onSubmit }) => {
  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/userdetails/details", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Necessary for sending files
          "Authorization": `Bearer ${token}`
        },
      });
      console.log("User details submitted successfully:", response.data);
      // Optionally, reset form after successful submission
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setCountry("");
      setCompanyName("");
      setJobTitle("");
      setProfileImage(null);
      onSubmit();
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  };

  return (
    <div className="user-form-container">
      <h2 className="form-title">Enter User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Image (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-submit">
          Submit User Details
        </button>
      </form>
    </div>
  );
};

export default UserDetailsInput;
