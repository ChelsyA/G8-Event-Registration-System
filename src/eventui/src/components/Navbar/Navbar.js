import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import axios from "axios";
import { DJ_AUTH_URL } from '../../store/constants';

const Navbar = (props) => {

  const navLink = (isLoginSelected) => {
    return isLoginSelected ? console.log("Navigate to Login") : console.log("Navigate to Register");
  }

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const config = {
      method: 'post',
      url: `${DJ_AUTH_URL}logout/`,
      headers: { 
        'Authorization': `Token ${user.token}`,
      }
    };
    
    axios(config)
    .then(res => {
      if(res.data.status === 200)
      {
        localStorage.removeItem("user");
        props.onlogout(true);
      }
    })
    .catch(err => {
      localStorage.removeItem("user");
      props.onlogout(true);
      return;
    });
  }

  return (
    <Auxiliary>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-dark header-bg fixed-top shadow-lg">
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#/">
                Events <span className="sr-only">(current)</span>
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#/">
                  Events
                </a>
              </li> */}
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" onClick={props.is_auth ? logout : () => navLink(true)}>
                <button className="btn btn-primary">
                  {props.is_auth ? "Logout" : "Login"}
                </button>
              </li>
              {!props.is_auth ? (
                <li className="nav-item">
                  <button className="btn btn-outline-info" onClick={() => navLink(false)}>
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
