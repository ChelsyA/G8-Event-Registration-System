import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import axios from "axios";
import { DJ_AUTH_URL, DURL } from "../../store/constants";

const Navbar = (props) => {
  const navLink = (isLoginSelected) => {
    props.loginNavHandler(isLoginSelected);
  };

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      method: "post",
      url: `${DJ_AUTH_URL}logout/`,
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    };

    axios(config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("user");
          props.onlogout(true);
          window.location.href = DURL
        }
      })
      .catch((err) => {
        localStorage.removeItem("user");
        props.onlogout(true);
        window.location.href = DURL
        return;
      });
  };

  const dropdown = () => (
    <li className="nav-item dropdown ml-auto">
      <a href="#/" className="nav-link dropdown-toggle" data-toggle="dropdown">
        {props.user !== null ? props.user.username : "Welcome"}
      </a>
      <div className="dropdown-menu dropdown-menu-right">
        <a href="#/" className="dropdown-item" onClick={() => props.onpage(true)}>
          Profile
        </a>
        {/* <a href="#/" className="dropdown-item">
          Events
        </a> */}
        <div className="dropdown-divider"></div>
        <a href="#/" className="dropdown-item" onClick={logout}>
          Logout
        </a>
      </div>
    </li>
  );

  return (
    <Auxiliary>
      <header className="header fixed-top">
        <nav className="navbar navbar-expand-lg navbar-dark event-color shadow-lg fixed-top">
          <a className="navbar-brand font-weight-bold" href="#/">
            OctaVents
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {!props.is_auth ? (
                <li className="nav-item" onClick={() => navLink("Login")}>
                  <button className="btn btn-primary mb-2">
                  Login
                </button>
                </li>
              ) : (
                dropdown()
              )}
              {!props.is_auth ? (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navLink("Register")}
                  >
                    Register
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </nav>
      </header>
    </Auxiliary>
  );
};

export default Navbar;
