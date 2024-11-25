import React, { useEffect, useState } from "react";
import axios from "axios";

const Compliance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/compliance")
      .then(response => setData(response.data.message))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Compliance</h2>
      <p>{data ? data : "Loading..."}</p>
    </div>
  );
};

export default Compliance;
