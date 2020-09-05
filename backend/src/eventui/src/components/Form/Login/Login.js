import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import * as action from '../../../store/auth';
import axios from 'axios';
import * as consts from '../../../store/constants'
import * as details from '../../../store/details';

const Login = (props) => {

  const data = {
    ...details.loginDetail
  }

  const submit = (event) => {
    event.persist();
    event.preventDefault();
    axios
      .post(`${consts.DJ_AUTH_URL}login\\`, data)
      .then(res => {
        if (res.status === 200) {
          const user = {
            token: res.data.key,
            username: data.username,
            expire: new Date(new Date().getTime() + 3600 * 1000)
          };
          props.submitLogin(user)
          localStorage.setItem("user", JSON.stringify(user));
          action.checkAuthTimeout(3600);
        }
      })
      .catch(err => {
        alert('error happen')
        action.authFail(err);
      });
  };

  const onChangeHandler = (event) => {
    const { id, value } = event.target;
    data[id] = value;
  };

  return (
    <Auxiliary>
      <div className="col-md-4 col-sm-8 col-xs-6 mx-auto panel">
        <div className="text-center py-4">
          <h3 className="form-title font-weight-bold">LOGIN</h3>
        </div>
        <form method="POST" className="p-1">
          <div className="form-group">
            <label htmlFor="username">Username <span className="require">*</span></label>
            <input
              type="username"
              className="form-control inputBG"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Username"
              onChange={(event) => onChangeHandler(event)}
              required={true}
            />
            {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className="require">*</span></label>
            <input
              type="password"
              className="form-control inputBG"
              id="password"
              placeholder="Password"
              onChange={(event) => onChangeHandler(event)}
              required
            />
          </div>
          <button
            onClick={(event) => submit(event)}
            className="btn btn-primary btn-block borderRadius"
          >
            Submit
          </button>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <a href="#/" className="link">
                Sign up!
              </a>
            </p>
          </div>
        </form>
      </div>
    </Auxiliary>
  );
};

export default Login;
