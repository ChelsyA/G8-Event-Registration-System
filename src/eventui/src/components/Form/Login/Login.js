import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import * as consts from "../../../store/constants";
import {loginDetail} from "../../../store/details";
import { feedback } from "../../Helper/utils";

const Login = (props) => {
  let isValid = false;
  let isSubmit = false;
  let data = {
    ...loginDetail,
  };

  const [isLoading, setIsLoading] = useState(false);

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    validate(["username", "password"]);
    if (isValid) {
      setIsLoading(true);
      axios
        .post(`${consts.DJ_AUTH_URL}login/`, data)
        .then((res) => {
          setIsLoading(false);
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
          setIsLoading(false);
          isSubmit = false;
          notify(
            "Unable to log in with provided credentials.",
            "error",
            "top-center"
          );
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
    event.persist();
    event.preventDefault();
    const { id, value } = event.target;
    data[id] = value;
  };

  return (
    <Auxiliary>
      {<Toast />}
      <div className="col-md-4 col-sm-8 col-xs-6 mx-auto panel">
        <div className="text-center py-4">
          <button
            onClick={() => props.back()}
            type="button"
            className="btn btn-lg float-left"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
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
            disabled={isLoading}
            onClick={(event) => submit(event)}
            className="btn btn-color btn-block rounded-pill my-4"
          >
            {isLoading ? "Sending..." : "LOGIN"}{" "}
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-sign-in-alt"></i>
            )}
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
