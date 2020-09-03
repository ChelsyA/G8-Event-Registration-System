import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const Login = (props) => {
  
  const { state, setState } = useState({
    email: "",
    password: "",
  });

  const submit = (event) => {
    event.persist();
    event.preventDefault();
    console.log(props.submitLogin);
  };

  const onChangeHandler = (event) => {
    const { id, value } = event.target;
    console.log(id + " " + value);
  };

  return (
    <Auxiliary>
      <div className="col-md-4 col-sm-8 col-xs-6 mx-auto panel">
        <div className="text-center py-4">
          <h3 className="form-title font-weight-bold">LOGIN</h3>
        </div>
        <form method="POST" className="p-1">
          <div className="form-group">
            <label htmlFor="email">Email address <span className="require">*</span></label>
            <input
              type="email"
              className="form-control inputBG"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(event) => onChangeHandler(event)}
              required
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
