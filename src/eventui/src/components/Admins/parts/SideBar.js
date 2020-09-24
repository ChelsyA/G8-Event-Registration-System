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
            {props.is_superuser ? (
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => props.onSwitch("")}>
                <i className="fas fa-columns"></i> Dashboard
                <span className="sr-only">(current)</span>
              </a>
              </li>
            ) : null}
            {props.is_superuser ? (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onSwitch("users")}>
                  <i className="fas fa-users"></i> Users
                </a>
              </li>
            ) : null}
            {/* {!props.is_superuser ? (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => props.onSwitch("ebooks")}>
                  <i className="fas fa-book-open"></i> Your Book Events
                </a>
              </li>
            ) : null} */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => props.onSwitch("ebooks")}>
                <i className="fas fa-book-open"></i> Your Book Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => props.onSwitch("profile")}>
                <i className="fas fa-user"></i> Profile
              </a>
            </li>
          </ul>
          <div className="fixed-bottom">
            <button className="btn btn-color" onClick={() => props.onpage(false)}>Back to Home</button>
          </div>
        </div>
      </nav>
    </Auxiliary>
  );
};

export default SideBar;
