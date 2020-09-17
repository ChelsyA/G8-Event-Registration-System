import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { DJ_AUTH_URL } from "../../../store/constants";

const Nav = (props) => {
  const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      method: "post",
      url: `${DJ_AUTH_URL}logout/`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios(config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("user");
          props.onlogout(true);
        }
      })
      .catch((err) => {
        localStorage.removeItem("user");
        props.onlogout(true);
        return;
      });
  };

  return (
    <Auxiliary>
      <nav className="navbar navbar-dark sticky-top event-color flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#/">
          OctaVents
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="#/" onClick={logout}>
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    </Auxiliary>
  );
};

export default Nav;
