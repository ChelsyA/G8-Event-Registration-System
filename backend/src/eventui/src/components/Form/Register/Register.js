import React, { useState } from "react";
import axios from "axios";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";

import Auxiliary from "../../../hoc/Auxiliary";
import * as consts from "../../../store/constants";
import * as details from "../../../store/details";
import countrycodes from "../../../store/countrycodes";
import { diffDate } from '../../Helper/func';

// import { WaveLoading } from 'react-loadingg';
// import { Backdrop } from '../../Helper/Backdrop';

const Register = (props) => {
  const [userDetail, setUserDetail] = useState({ ...details.registerDetail });
  const user = JSON.parse(localStorage.getItem("user"));
  const expire = user === null ? new Date(new Date().getTime() + 3600 * 1000) : user.expireDate;
  const nowDate = new Date();
  console.log(diffDate(nowDate, expire));
  // let [isLoading, setLoading] = useState(false);
  let [isDisabled, setDisabled] = useState(true);
  let isValid = false;
  let isCheck = false;
  let isSubmit = false;

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    console.log(userDetail);
    validate([
      "first_name",
      "last_name",
      "username",
      "email",
      "password",
      "password2",
    ]);
    
    if (!emailValid(userDetail.email)) {
      notify("Invaild email! Please enter a valid email.", "error");
      return;
    }
    if (!matchPassword(userDetail.password, userDetail.password2,)) {
      notify("Both password must match!", "error");
      return;
    }
    
    userDetail.phone_number = userDetail.code + userDetail.phone_number;
    if (validPhoneNumber(userDetail.code, userDetail.phone_number)) {
      notify(
        "Phone number is not valid!",
        "error"
      );
      return;
    }

    if (isCheck) {
      notify(
        "Please accept our terms and conditions before proceeding!",
        "error"
      );
      return;
    } else {
      if (isValid) {
        // setLoading(true);
        axios
          .post(`${consts.EVENTAPP_URL}register`, userDetail,)
          .then((res) => {
            if (res.status === 200) {
              props.submitRegister(res.data);
            }
          })
          .catch((err) => {
            notify(
              "Oops something go wrong! Please check to ensure all required fields are entered",
              "error"
            );
            return;
          });
      }
    }
  };

  const emailValid = (e) => e.includes("@") && e.includes(".");

  const validPhoneNumber = (code, ph) => {
    let invalid = false;
    if(code !== "" && ph === "") {
      invalid = true;
    }
    else if (ph !== "" && code === "") {
      invalid = true;
    }
    else {
      invalid = false;
    }
    return invalid;
  }

  const validate = (ids) => {
    ids.forEach((id) => {
      if (userDetail[id] === "") {
        isValid = false;
        isSubmit = false;
        const splitId = id.split("_").join(" ");
        if (isSubmit === false) {
          notify(
            `Please ${
              id === "password2" ? "confirm password" : splitId
            } field is required!`,
            "error"
          );
        }
      } else {
        isValid = true;
      }
    });
  };

  const matchPassword = (p1, p2) => p1 === p2;

  const isChecked = (event) => {
    event.persist();
    isCheck = event.target.checked;
    setDisabled(!event.target.checked);
  };

  const options = countrycodes.map((option, i) => {
    return (
      <option key={i} value={option.dial_code}>
        {option.name} : ({option.dial_code})
      </option>
    );
  });

  return (
    <Auxiliary>
      {<Toast />}
      <div className="col-md-9 col-sm-12 col-xs-12 mx-auto panel">
        <div className="text-center pt-3">
          <h3 className="form-title font-weight-bold">Registration</h3>
        </div>
        <form className="p-2" method="POST" autoComplete="off">
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
                name="first_name"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="last_name"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="email"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="username"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="password"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="password2"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                  name="code"
                  onChange={(event) =>
                    setUserDetail({
                      ...userDetail,
                      [event.target.name]: event.target.value,
                    })
                  }
                >
                  <option defaultValue>Code</option>
                  {options}
                </select>
                <input
                  type="number"
                  className="form-control inputBG w-25"
                  id="phone_number"
                  placeholder="Phone # eg 551396690"
                  name="phone_number"
                  onChange={(event) =>
                    setUserDetail({
                      ...userDetail,
                      [event.target.name]: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <select
                id="city"
                className="form-control inputBG"
                name="city"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
                name="address"
                onChange={(event) =>
                  setUserDetail({
                    ...userDetail,
                    [event.target.name]: event.target.value,
                  })
                }
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
              className="btn btn-primary rounded-pill px-5 my-4"
            >
              Create Account
            </button>
          </div>
          {/* <div className="mt-1">
            <p>
              Already have an account?{" "}
              <a href="#/" className="link">
                Login here
              </a>
            </p>
          </div> */}
        </form>
      </div>
    </Auxiliary>
  );
};

export default Register;
