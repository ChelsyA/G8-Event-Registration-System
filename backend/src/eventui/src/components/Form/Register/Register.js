import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from 'axios';
import * as consts from '../../../store/constants'
import * as details from '../../../store/details';

const Register = (props) => {
  const data = {
    ...details.registerDetail
  }

  const submit = (event) => {
    event.persist();
    event.preventDefault();
    axios
      .post(`${consts.EVENTAPP_URL}register`, data)
      .then(res => {
        if (res.status === 200) {
          props.submitRegister(res.data)
        }
      })
      .catch(err => {
        alert('error happen')
        console.log(err)
      });
  };

  const onChangeHandler = (event) => {
    const { id, value } = event.target;
    data[id] = value;
    console.log(value)
  };


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
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="lastname">Last Name <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="last_name"
                placeholder="Last Name"
                onChange={(event) => onChangeHandler(event)}
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
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="username">Username <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="username"
                placeholder="Username"
                onChange={(event) => onChangeHandler(event)}
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
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirmpassowrd">Confirm Password <span className="require">*</span></label>
              <input
                type="password"
                className="form-control inputBG"
                id="password2"
                placeholder="Confirm Password"
                onChange={(event) => onChangeHandler(event)}
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
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City <span className="require">*</span></label>
              <select id="city" className="form-control inputBG" onChange={(event) => onChangeHandler(event)}>
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
            <div className="form-group col-md-6">
              <label htmlFor="address">Address <span className="require">*</span></label>
              <input
                type="text"
                className="form-control inputBG"
                id="address"
                placeholder="Address"
                onChange={(event) => onChangeHandler(event)}
              />
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
            <button type="submit"
              onClick={(event) => submit(event)}
              className="btn btn-primary borderRadius px-5">
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
