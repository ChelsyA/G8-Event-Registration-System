import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import { DEFAULT_URL, DURL } from "../../../store/constants";
import { loginDetail } from "../../../store/details";
import { feedback } from "../../Helper/utils";

const Login = (props) => {
  let isValid = false;
  let isSubmit = false;
  const [user, setUser] = useState({...loginDetail})
  // let data = {
  //   ...loginDetail,
  // };

  const [isLoading, setIsLoading] = useState(false);

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    validate(["username", "password"]);
    if (isValid) {
      setIsLoading(true);
      var FormData = require("form-data");
      var data = new FormData();
      data.append("username", user.username);
      data.append("password", user.password);

      var config = {
        method: "post",
        url: DEFAULT_URL + "login/",
        data: data,
      };

      axios(config)
        .then(function (response) {
          setIsLoading(false);
          console.log(JSON.stringify(response.data));
          const userDetail = {
            username: user.username,
            expireDate: response.data.expiry,
            token: response.data.token,
          }
          localStorage.setItem("user", JSON.stringify(userDetail));
          window.location.href = DURL
        })
        .catch(function (error) {
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
      if (user[id] === "") {
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

  // const onChangeHandler = (event) => {
  //   event.persist();
  //   event.preventDefault();
  //   const { id, value } = event.target;
  //   user[id] = value;
  // };

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
              // onChange={(event) => onChangeHandler(event)}
              onChange={(event) => setUser({...user, username: event.target.value})}
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
              // onChange={(event) => onChangeHandler(event)}
              onChange={(event) => setUser({...user, password: event.target.value})}
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
