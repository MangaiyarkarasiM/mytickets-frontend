import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="d-flex mt-5 align-items-center flex-column justify-content-center bg-dark">
      <div className="d-flex align-items-start justify-content-start">
        <div className="mx-3 my-3">
          <Link to="#" className="footer-item">
            About us
          </Link>
        </div>
        <div className="vl"></div>
        <div className="mx-3 my-3">
          <Link to="#" className="footer-item">
            Customer Care
          </Link>
        </div>
        <div className="vl"></div>
        <div className="mx-3 my-3">
          <Link to="#" className="footer-item">
            Feedback
          </Link>
        </div>
      </div>
      <div style={{ color: "white" }} className="border-bottom"></div>
      <div className="mb-3 ml-3 text-white text-center">
        ©️2022 myTickets.com
      </div>
    </div>
  );
}

export default Footer;
