import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const FormPanel = (props) => {
<<<<<<< HEAD
=======
  console.log(props.isregister);
>>>>>>> Development
  return (
    <Auxiliary>
      <div className="col-md-9 col-sm-12 col-xs-12 mx-auto panel">
        <div className="text-center pt-3">
          <h3 className="form-title font-weight-bold">Registration</h3>
        </div>
        <form className="p-2" method="POST">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control inputBG"
                id="first_name"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control inputBG"
<<<<<<< HEAD
                id="last_name"
=======
                id="first_name"
>>>>>>> Development
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control inputBG"
                id="email"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="address">Address</label>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control inputBG"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirmpassowrd">Confirm Password</label>
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
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="text"
                className="form-control inputBG"
                id="phone_number"
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
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
              />
              <label className="form-check-label" htmlFor="gridCheck">
                I agree with the terms and conditions
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

export default FormPanel;
