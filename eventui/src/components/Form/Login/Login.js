import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const FormPanel = (props) => {
  return (
    <Auxiliary>
      <div className="container mt-5">
        <div className="row mx-1">
            <div className="col-md-4 col-sm-8 col-xs-6 mx-auto panel">
                <div className="text-center">
                    <h3 className="display-4">LOGIN</h3>
                </div>
                <form method="POST" className="p-1">
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control inputBG" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control inputBG" id="password" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block borderRadius">Submit</button>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <a href="#/" className="link">Sign up!</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </Auxiliary>
  );
};

export default FormPanel;
