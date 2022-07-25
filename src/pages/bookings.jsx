import React from "react";
import Layout from "../components/Layout/Layout";

function BookingsPage(props) {
  return (
    <>
      <div className="container-fluid">
        <Layout />
      </div>
      <div className="container">
        <div style={{ height: "100vh" }}>
          <div>All Bookings</div>
        </div>
      </div>
    </>
  );
}

export default BookingsPage;
