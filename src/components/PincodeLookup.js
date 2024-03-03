import React, { useState } from "react";
import axios from "axios";
import PostOfficeDetails from "./PostOfficeDetails";

const PincodeLookup = () => {
  const [pincode, setPincode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data[0].Status == "Error") {
        setError(response.data[0].Message);
      }

      if (response.data[0].Status == "Success") {
        setData(response.data[0].PostOffice);
        setError("");
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="first-container">
          {data ? null : (
            <>
              <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" />
              <button className="fetch-button" onClick={fetchData}>Lookup</button>
            </>
          )}
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && <PostOfficeDetails postOffices={data} />}
        </div>
      );
      
};

export default PincodeLookup;
