import React from "react";
import Layout from "../components/Layout/Layout";

function ShowsPage(props) {
  return (
    <>
      <div className="container-fluid">
        <Layout />
      </div>
      <div className="container">
        <div style={{ height: "100vh" }}>
          <div>All shows</div>
        </div>
      </div>
    </>
  );
}

export default ShowsPage;
