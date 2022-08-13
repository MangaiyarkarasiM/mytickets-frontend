import React, { useEffect, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext} from "../../context/globalContext";

const navitemsadmin = [
  {
    to: "/dashboard",
    title: "Home",
  },
  {
    to: "/movies",
    title: "Movies",
  },
  {
    to: "/theaters",
    title: "Theaters",
  },
  {
    to: "/shows",
    title: "Shows",
  },
  {
    to: "/bookings",
    title: "Bookings",
  },
];

const navitems = [
  {
    to: "/dashboard",
    title: "Home",
  },
  {
    to: "/movies",
    title: "Movies",
  },
];

function Layout(props) {
  let {user} = useContext(GlobalContext);
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const ssuser = sessionStorage.getItem("userID");
    setUserID(ssuser);
    const ssrole = sessionStorage.getItem("role");
    setRole(ssrole);
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-between bg-dark p-2">
      <nav className="navbar navbar-expand-lg navbar-light">
        <button
          className="btn navbar-toggler mr-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <i className="fa fa-bars text-white" aria-hidden="true"></i>
          </span>
        </button>
        <div
          style={{ fontSize: "1.1rem" }}
          className="font-weight-bold text-center font-italic mr-3 text-white"
        >
          myTickets.com
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user.role === "admin"
              ? navitemsadmin.map((nav) => {
                  return (
                    <li className="nav-item" key={nav.title}>
                      <NavLink
                        key={nav.title}
                        className="mx-4 nav-items"
                        to={nav.to}
                      >
                        {nav.title}
                      </NavLink>
                    </li>
                  );
                })
              : navitems.map((nav) => {
                  return (
                    <li className="nav-item" key={nav.title}>
                      <NavLink
                        key={nav.title}
                        className="mx-4 nav-items"
                        to={nav.to}
                      >
                        {nav.title}
                      </NavLink>
                    </li>
                  );
                })}
          </ul>
        </div>
      </nav>

      <a
        className="dropdown text-white p-0 mr-3"
        data-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        to="#"
      >
        <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
      </a>
      <div
        className="dropdown-menu dropdown-menu-right"
        style={{ width: "10px" }}
      >
        <NavLink
          to={`/users/profile/${userID}`}
          className="text-dark bg-white dropdown-item"
        >
          Profile
        </NavLink>
        <button
          className="text-dark bg-white dropdown-item"
          onClick={() => {
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Layout;
