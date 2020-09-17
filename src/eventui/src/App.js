import React, { Component } from "react";
import { Toast, notify } from "./components/Helper/notify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Auxiliary from "./hoc/Auxiliary";
import FormPanel from "./components/Form/Form";
import EventLayout from "./components/Events/EventLayout";
import { isExpired, getUser } from "./components/Helper/utils";
import Dashboard from './components/Admin/Dashboard';

class App extends Component {
  state = {
    isLoginForm: false,
    isRegisterForm: false,
    isAuthenticated: false,
    user: null,
  };

  componentDidMount() {
    isExpired()
      ? this.setState({ isAuthenticated: false })
      : this.setState({ isAuthenticated: true });
    this.setState({ user: getUser() });
  }

  setSwitchForm = (isloginform) => {
    this.setState({ isLoginForm: isloginform });
  };

  onSubmitLogin = (result) => {
    if (result) {
      this.setState({
        isAuthenticated: true,
        isLoginForm: !result,
        user: result,
        isRegisterForm: !result,
      });
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
      this.setState({ isAuthenticated: false });
      this.setState({ user: null });
    } else {
      notify("Ooop!, Look like you can't log out.", "info");
    }
  };

  onNavBack = () => {
    this.setState({ isLoginForm: false, isRegisterForm: false });
  }

  onSubmitRegister = (result) => {
    if (result.is_success) {
      notify(
        "Registered successfully! Confirm email link has been sent so please check your inbox or spam.",
        "success"
      );
      this.setState({ isLoginForm: result.is_success });
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
        <Dashboard />
      </Auxiliary>
    );
  }
}

export default App;
