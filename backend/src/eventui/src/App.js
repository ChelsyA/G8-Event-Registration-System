import React, { Component } from "react";
import "./App.css";
import Auxiliary from "./hoc/Auxiliary";
import Navbar from "./components/Navbar/Navbar";
import FormPanel from "./components/Form/Form";
import { Toast, notify } from "./components/Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import { isExpired } from "./components/Helper/func";

class App extends Component {
  state = {
    isLoginForm: true,
    isAuthenticated: false,
  };

  componentDidMount() {
    isExpired()
      ? this.setState({ isAuthenticated: false })
      : this.setState({ isAuthenticated: true });
  }

  setSwitchForm = (isloginform) => {
    this.setState({ isLoginForm: isloginform });
  };

  onSubmitLogin = (result) => {
    if (result) {
      this.setState({ isAuthenticated: true });
    }
  };

  onLogout = (result) => {
    if(result){
      this.setState({ isAuthenticated: false });
    }
    else {
      notify("Ooop!, Look like you can't log out.", "info");
    }
  }

  onSubmitRegister = (result) => {
    console.log(result);
    if (result.is_success) {
      notify("Registered successfully! Please login to proceed.", "success");
      this.setState({ isLoginForm: result.is_success });
    }
  };

  render() {
    const form = (
      <div className="container mt-2 mb-3">
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
            isLogin={this.state.isLoginForm}
          />
        </div>
      </div>
    );

    return (
      <Auxiliary>
        {<Toast />}
        {this.state.isAuthenticated ? <Navbar onlogout={this.onLogout} is_auth={this.state.isAuthenticated} /> : form}
      </Auxiliary>
    );
  }
}

export default App;
