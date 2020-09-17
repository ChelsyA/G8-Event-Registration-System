import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const SideBar = (props) => {
  return (
    <Auxiliary>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
              <i className="fas fa-columns"></i> Dashboard
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <i className="fas fa-users"></i> Registered Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <i className="fas fa-book-open"></i> Booked Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
              <i className="fas fa-user"></i> Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Auxiliary>
  );
};

export default SideBar;
