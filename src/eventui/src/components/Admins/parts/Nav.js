import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { DEFAULT_URL, DURL } from "../../../store/constants";
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const Nav = (props) => {

  // Log out functionality
  const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let csrftoken = Cookies.get('csrftoken');

    var config = {
      method: "post",
      url: DEFAULT_URL + "logout/",
      headers: {
        Authorization:
          "Token " + user.token,
          'X-CSRFToken': csrftoken,
      },
    };

    axios(config)
      .then((_) => {
        localStorage.removeItem("user");
        props.onlogout(true);
        window.location.href = DURL
      })
      .catch((_) => {
        localStorage.removeItem("user");
        props.onlogout(true);
        window.location.href = DURL
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
