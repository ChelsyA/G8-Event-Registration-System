import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import axios from "axios";
import { DJ_AUTH_URL } from '../../store/constants';

const Navbar = (props) => {

  const logout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    var config = {
      method: 'post',
      url: `${DJ_AUTH_URL}logout/`,
      headers: { 
        'Authorization': `Token ${user.token}` , 
      }
    };
    
    axios(config)
    .then((res) => {
      console.log(res);
      if(res.data.status === 200)
      {
        localStorage.removeItem("user");
        props.onlogout(true);
      }
    })
    .catch(function (error) {
      return;
    });

    console.log(DJ_AUTH_URL);
  }

  return (
    <Auxiliary>
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand font-weight-bold" href="#/">
            G8
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
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/">
                  Events
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" onClick={logout}>
                <button className="btn btn-primary">
                  {props.is_auth ? "Logout" : "Login"}
                </button>
              </li>
              {!props.is_auth ? (
                <li className="nav-item">
                  <button className="btn btn-outline-info">
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
