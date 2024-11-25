const findIncentives = async (market, businessType) => {
    // Simulate incentive finding logic (replace with API calls or database queries)
    const incentiveDatabase = [
      {
        market: "USA",
        businessType: "Tech",
        incentives: ["R&D Tax Credits", "Startup Grants", "Low-Interest Loans"],
      },
      {
        market: "Germany",
        businessType: "Manufacturing",
        incentives: ["Export Financing", "Energy Efficiency Grants"],
      },
    ];
  
    const matchedIncentives = incentiveDatabase.find(
      (entry) => entry.market === market && entry.businessType === businessType
    );
  
    return matchedIncentives ? matchedIncentives.incentives : ["No incentives found"];
  };
  
  module.exports = { findIncentives };
  