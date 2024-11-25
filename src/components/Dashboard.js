import React, { useState } from "react";
import ProductDetailsInput from "./ProductDetailsInput";
import UserDetailsInput from "./UserDetailsInput";
import TargetCountryMarket from "./TargetCountryMarket";  // Add this import for the new page
import "./css/dashboard.css";

const Dashboard = () => {
  const [productDetailsSubmitted, setProductDetailsSubmitted] = useState(false); // Track if product details are submitted
  const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(false); // Track if user details are submitted
  const [currentStep, setCurrentStep] = useState(1); // Track the current step for the progress bar
  const [finalStep, setFinalStep] = useState(false); // Track if final step is reached (target country market)

  const handleProductDetailsSubmit = () => {
    setProductDetailsSubmitted(true);
    setCurrentStep(2); // Move to the next step when product details are submitted
  };

  const handleUserDetailsSubmit = () => {
    setUserDetailsSubmitted(true);
    setCurrentStep(3); // Move to the next step when user details are submitted
  };

  const totalSteps = 3; // Total number of steps in the process
  const progress = (currentStep / totalSteps) * 100; // Calculate the progress

  const handleTargetCountryMarketSubmit = () => {
    setFinalStep(true);
    setCurrentStep(4); // Move to the final step (target country market)
  };

  // Render TargetCountryMarket page once final step is reached
  if (finalStep) {
    return <TargetCountryMarket />;
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5">International Business Toolkit</h1>

      {/* Progress Bar */}
      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {currentStep}/{totalSteps} Steps Completed
        </div>
      </div>

      <div className="d-flex justify-content-between flex-wrap mb-4">
        {/* Product Details Tab */}
        {!productDetailsSubmitted && (
          <div className="d-flex flex-column w-100 w-md-48 mb-4">
            <div className="card">
              <div className="card-body">
                <ProductDetailsInput onSubmit={handleProductDetailsSubmit} />
              </div>
            </div>
          </div>
        )}

        {/* User Details Tab */}
        {productDetailsSubmitted && !userDetailsSubmitted && (
          <div className="d-flex flex-column w-100 w-md-48 mb-4">
            <div className="card">
              <div className="card-body">
                <UserDetailsInput onSubmit={handleUserDetailsSubmit} />
              </div>
            </div>
          </div>
        )}

        {/* Target Country Market Tab */}
        {userDetailsSubmitted && !finalStep && (
          <div className="d-flex flex-column w-100 w-md-48 mb-4">
            <div className="card">
              <div className="card-body">
                <TargetCountryMarket onSubmit={handleTargetCountryMarketSubmit} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
