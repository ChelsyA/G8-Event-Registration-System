import React, { useState } from "react";
import axios from "axios";
import { Toast, notify } from "../../libpac/notify";
import "react-toastify/dist/ReactToastify.css";

import Auxiliary from "../../../hoc/Auxiliary";
import * as consts from "../../../store/constants";
import * as details from "../../../store/details";
import countrycodes from "../../../store/countrycodes";

const Register = (props) => {
  const data = {
    ...details.registerDetail,
  };

  let [isDisabled, setDisabled] = useState(true);
  let [isCheck, setChecked] = useState(false);
  let isSubmit = false;

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    data.phone_number = data.code + data.phone_number;
    
    validate(["first_name", "last_name", "email", "password", "password2"]);

    if (isCheck) {
      console.log(isCheck)
      notify(
        "Please accept our terms and conditions before proceeding!",
        "error"
      );
      return;
    }else {
      console.log(isCheck)
    }

    axios
      .post(`${consts.EVENTAPP_URL}register`, data)
      .then(res => {
        if (res.status === 200) {
          props.submitRegister(res.data)
          notify(
            "Registered successfully!",
            "success"
          );
        }
      })
      .catch(err => {
        notify(
          "Oops something go wrong! Please check to ensure all required fields are entered",
          "error"
        );
        return;
      });
  };

  const validate = (ids) => {
    ids.forEach(id => {
      if(data[id] === "") {
        const splitId = id.split("_").join(" ");
        if(isSubmit){
          notify(
            `Please ${id === "password2" ? "confirm password" : splitId} field is required!`,
            "error"
          );
        }
        return;
      } 
    });
  };

  const onChangeHandler = (event) => {
    const { id, value } = event.target;
    data[id] = value;
    // validate(["first_name", "last_name", "email", "password", "password2"]);
  };

  const isChecked = (event) => {
    event.persist();
    setChecked(event.target.checked);
    setDisabled(event.target.checked);
  };

  const options = countrycodes.map((option, i) => {
    return (
      <option key={i} value={option.dial_code}>
        {option.name} : {option.dial_code}
      </option>
    );
  });

  return (
    <Auxiliary>
      {<Toast/>}
      <div className="col-md-9 col-sm-12 col-xs-12 mx-auto panel">
        <div className="text-center pt-3">
          <h3 className="form-title font-weight-bold">Registration</h3>
        </div>
        <form className="p-2" method="POST">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="first_name">
                First Name <span className="require">*</span>
              </label>
              <input
                type="text"
                className="form-control inputBG"
                id="first_name"
                placeholder="First Name"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="last_name">
                Last Name <span className="require">*</span>
              </label>
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
              <label htmlFor="email">
                Email Address <span className="require">*</span>
              </label>
              <input
                type="email"
                className="form-control inputBG"
                id="email"
                placeholder="Email Address"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="username">
                Username <span className="require">*</span>
              </label>
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
              <label htmlFor="password">
                Password <span className="require">*</span>
              </label>
              <input
                type="password"
                className="form-control inputBG"
                id="password"
                placeholder="Password"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="confirmpassowrd">
                Confirm Password <span className="require">*</span>
              </label>
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
              <label htmlFor="phone_number">Phone Number</label>
              <div className="input-group">
                <select
                  id="code"
                  className="form-control inputBG"
                  onChange={(event) => onChangeHandler(event)}
                >
                  <option defaultValue>Code</option>
                  {options}
                </select>
                <input
                  type="number"
                  className="form-control inputBG w-25"
                  id="phone_number"
                  placeholder="Phone # eg 551396690"
                  onChange={(event) => onChangeHandler(event)}
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <select
                id="city"
                className="form-control inputBG"
                onChange={(event) => onChangeHandler(event)}
              >
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
              <label htmlFor="address">Address</label>
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
                id="is_checked"
                onChange={(event) => isChecked(event)}
                required
              />
              <label className="form-check-label" htmlFor="gridCheck">
                I agree with the terms and conditions{" "}
                <span className="require">*</span>
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              disabled={isDisabled}
              type="submit"
              onClick={(event) => submit(event)}
              className="btn btn-primary rounded-pill px-5"
            >
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
