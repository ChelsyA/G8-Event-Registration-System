import React, { Component } from "react";
import axios from 'axios';
import { Toast, notify } from "./components/Helper/notify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Auxiliary from "./hoc/Auxiliary";
import FormPanel from "./components/Form/Form";
import EventLayout from "./components/Events/EventLayout";
import { isExpired } from "./components/Helper/utils";
import Dashboard from "./components/Admins/Dashboard";
import { EVENTAPP_URL } from './store/constants';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class App extends Component {
  state = {
    isLoginForm: false,
    isRegisterForm: false,
    isAuthenticated: false,
    user: null,
    isDashboard: false,
  };

  componentDidMount() {
    this.init();
    this.getUser();
  }

  init() {
    // isExpired()
    //   ? this.setState({ isAuthenticated: false })
    //   : this.setState({ isAuthenticated: true });

    if (isExpired()) {
      localStorage.removeItem("user");
      this.setState({ isAuthenticated: false });
    }
    else {
      this.setState({ isAuthenticated: true });
    }
  }

  getUser() {
    let csrftoken = Cookies.get('csrftoken');
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      axios.get(`${EVENTAPP_URL}user/${user.username}/`, {headers: {'X-CSRFToken': csrftoken}},).then(res => {
        this.setState({ user: res.data});
      })
    }
  }

  setSwitchForm = (isloginform) => {
    this.setState({ isLoginForm: isloginform });
  };

  onSubmitLogin = (result) => {
    if (result) {
      this.setState({
        isAuthenticated: true,
        isLoginForm: !result,
        // user: result,
        isRegisterForm: !result,
      });
      this.getUser();
    }
  };

  onLoginPageHandler = (selectPage) => {
    if (selectPage.toLowerCase() === "login") {
      this.setState({ isLoginForm: true, isRegisterForm: true });
    } else if (selectPage.toLowerCase() === "register") {
      this.setState({ isRegisterForm: true });
    } else {
      this.setState({ isLoginForm: false, isRegisterForm: false });
    }
  };

  onLogout = (is_logout) => {
    if (is_logout) {
      this.setState({ isAuthenticated: false, isDashboard: false });
      this.setState({ user: null });
    } else {
      notify("Ooop!, Look like you can't log out.", "info");
    }
  };

  onNavBack = () => {
    this.setState({
      isLoginForm: false,
      isRegisterForm: false,
      isDashboard: false,
    });
  };

  onSubmitRegister = (result) => {
    if (result.is_success) {
      notify(
        "Registered successfully! Confirm email link has been sent so please check your inbox or spam.",
        "success"
      );
      this.setState({ isLoginForm: result.is_success });
    }
  };

  onPageChange = (isDashSelected) => {
    if (isDashSelected) {
      console.log("Dashboard");
      this.setState({ isDashboard: true });
    } else {
      console.log("Event page");
      this.setState({ isDashboard: false });
    }
  };

  render() {
    const form = (
      <div
        className={
          this.state.isLoginForm ? "container mtop mb-3" : "container mt-3 mb-3"
        }
      >
        <div className="row mx-1">
          <div className="col-md-9 col-sm-12 col-xs-12 mx-auto text-center py-3">
            <div
              className="btn-group"
              role="group"
              aria-label="Switch button form"
            >
              <button
                className="btn btn-primary"
                onClick={() => this.setSwitchForm(true)}
              >
                LOGIN
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.setSwitchForm(false)}
              >
                REGISTER
              </button>
            </div>
          </div>
          <FormPanel
            onLogin={this.onSubmitLogin}
            onRegister={this.onSubmitRegister}
            onBack={this.onNavBack}
            isLogin={this.state.isLoginForm}
            isRegister={this.state.isRegisterForm}
          />
        </div>
      </div>
    );

    return (
      <Auxiliary>
        <Toast />
        {this.state.isDashboard ? (
          <Dashboard user={this.state.user} onpage={this.onPageChange} islogout={this.onLogout}/>
        ) : this.state.isLoginForm || this.state.isRegisterForm ? (
          form
        ) : (
          <EventLayout
            onpage={this.onPageChange}
            loginNavHandler={this.onLoginPageHandler}
            user={this.state.user}
            isAuthenticated={this.state.isAuthenticated}
            islogout={this.onLogout}
          />
        )}
        {/* {this.state.isLoginForm || this.state.isRegisterForm ? (
          form
        ) : (
          <EventLayout
            loginNavHandler={this.onLoginPageHandler}
            user={this.state.user}
            isAuthenticated={this.state.isAuthenticated}
            islogout={this.onLogout}
          />
        )} */}
        {/* <Dashboard /> */}
      </Auxiliary>
    );
  }
}

export default App;
