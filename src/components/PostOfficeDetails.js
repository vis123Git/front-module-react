import React, { useState } from "react";

const PostOfficeDetails = ({ postOffices }) => {
  const [filter, setFilter] = useState("");

  const filteredData = postOffices.filter((office) => office.Name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by Post Office Name" />
      <div style={{ marginLeft: '20px' }}>
        <b>Message</b>: Number of post offices(s) found : <strong>{filteredData.length}</strong>
      </div>

      <div className="post-office-container">
        {filteredData.length ? (
          filteredData.map((office, index) => (
            <div className="post-office-details" key={index}>
              <p>
                <b>{office.Name}</b>
              </p>
              <p>Branch Type: {office.BranchType}</p>
              <p>Delivery Status: {office.DeliveryStatus}</p>
              <p>District: {office.District}</p>
              <p>State: {office.State}</p>
            </div>
          ))
        ) : (
          <div>Couldn’t find the postal data you’re looking for…</div>
        )}
      </div>
    </div>
  );
};

export default PostOfficeDetails;
