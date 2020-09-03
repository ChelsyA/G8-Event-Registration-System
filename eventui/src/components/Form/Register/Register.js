import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const Register = (props) => {
  console.log(props.submitRegister);
  return (
    <Auxiliary>
      <div className="col-md-9 col-sm-12 col-xs-12 mx-auto panel">
        <div className="text-center pt-3">
          <h3 className="form-title font-weight-bold">Registration</h3>
        </div>
        <form className="p-2" method="POST">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="first_name"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="last_name"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email Address <span className="require">*</span></label>
              <input
                type="email"
                className="form-control inputBG"
                id="email"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="address"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password <span className="require">*</span></label>
              <input
                type="password"
                className="form-control inputBG"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirmpassowrd">Confirm Password <span className="require">*</span></label>
              <input
                type="password"
                className="form-control inputBG"
                id="confirm_password"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="phonenumber">Phone Number <span className="require">*</span></label>
              <input
                type="number"
                className="form-control inputBG"
                id="phone_number"
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City <span className="require">*</span></label>
              <select id="city" className="form-control inputBG">
                <option defaultValue>Choose...</option>
                <option>Akosombo</option>
                <option>Aburi</option>
                <option>Accra</option>
                <option>Kumasi</option>
                <option>Koforidua</option>
                <option>Tamale</option>
                <option>Hohoe</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                required
              />
              <label className="form-check-label" htmlFor="gridCheck">
                I agree with the terms and conditions <span className="require">*</span>
              </label>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary borderRadius px-5">
              Create Account
            </button>
          </div>
          <div className="mt-1">
            <p>
              Already have an account?{" "}
              <a href="#/" className="link">  
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </Auxiliary>
  );
};

export default Register;
