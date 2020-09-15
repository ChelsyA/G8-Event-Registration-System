import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import * as consts from "../../../store/constants";
import * as details from "../../../store/details";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import { feedback } from "../../Helper/utils";

const Login = (props) => {
  let isValid = false;
  let isSubmit = false;
  const data = {
    ...details.loginDetail,
  };

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    validate(["username", "password"]);
    if (isValid) {
      axios
        .post(`${consts.DJ_AUTH_URL}login\\`, data)
        .then((res) => {
          if (res.status === 200) {
            const user = {
              token: res.data.access_token,
              ...res.data.user,
              expireDate: new Date(new Date().getTime() + 3600 * 100000),
            };
            props.submitLogin(user);
            localStorage.setItem("user", JSON.stringify(user));
          }
        })
        .catch((err) => {
          isSubmit = false;
          notify("Unable to log in with provided credentials.", "error", "top-center");
          return;
        });
    }
  };

  const validate = (ids) => {
    ids.forEach((id) => {
      if (data[id] === "") {
        isValid = false;
        isSubmit = false;
        if (!isSubmit) {
          feedback(id, false);
        }
      } else {
        isValid = true;
        feedback(id, true);
      }
    });
  };

  const onChangeHandler = (event) => {
    const { id, value } = event.target;
    data[id] = value;
  };

  return (
    <Auxiliary>
      {<Toast />}
      <div className="col-md-4 col-sm-8 col-xs-6 mx-auto panel">
        <div className="text-center py-4">
          <h3 className="form-title font-weight-bold">LOGIN</h3>
        </div>
        <form method="POST" className="p-1">
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="require">*</span>
            </label>
            <input
              type="username"
              className="form-control inputBG"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Username"
              onChange={(event) => onChangeHandler(event)}
              required={true}
            />
            <div
              id="username_feedback"
              className="invalid-feedback is-invisible"
            >
              Please username is required.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="require">*</span>
            </label>
            <input
              type="password"
              className="form-control inputBG"
              id="password"
              placeholder="Password"
              onChange={(event) => onChangeHandler(event)}
              required
            />
            <div
              id="password_feedback"
              className="invalid-feedback is-invisible"
            >
              Please password is required.
            </div>
          </div>
          <button
            onClick={(event) => submit(event)}
            className="btn btn-color btn-block rounded-pill my-4"
          >
            LOGIN
          </button>
          <div className="mt-3 text-center">
            <p>
              <a href="#/" className="link">
                Forget password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </Auxiliary>
  );
};

export default Login;
