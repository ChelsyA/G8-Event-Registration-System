import React, { useState } from "react";
import axios from "axios";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";

import Auxiliary from "../../../hoc/Auxiliary";
import * as consts from "../../../store/constants";
import {registerDetail} from "../../../store/details";
import { feedback } from "../../Helper/utils";

const Register = (props) => {
  const [userDetail, setUserDetail] = useState({ ...registerDetail });
  let [isDisabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let isValid = false;
  let isCheck = false;
  let isSubmit = false;

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    validate([
      "first_name",
      "last_name",
      "username",
      "email",
      "password",
      "password2",
    ]);

    if (!emailValid(userDetail.email)) {
      feedback("email", false, "Invaild email! Please enter a valid email.");
      return;
    }
    if (!matchPassword(userDetail.password, userDetail.password2)) {
      notify("Both password must match and be at least 7 characters", "error");
      feedback("password", false);
      feedback("password2", false);
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
        setIsLoading(true);
        axios
          .post(`${consts.EVENTAPP_URL}register/`, userDetail)
          .then((res) => {
            setIsLoading(false);
            if (res.status === 201) {
              props.submitRegister(res.data);
            }
          })
          .catch((err) => {
            setIsLoading(false);
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

  const validate = (ids) => {
    ids.forEach((id) => {
      if (userDetail[id] === "") {
        isValid = false;
        isSubmit = false;
        if (isSubmit === false) {
          feedback(id, false);
        }
      } else {
        isValid = true;
        feedback(id, true);
      }
    });
  };

  const matchPassword = (p1, p2) =>
    p1 === p2 && p1.length >= 6 && p2.length >= 6;

  const isChecked = (event) => {
    event.persist();
    isCheck = event.target.checked;
    setDisabled(!event.target.checked);
  };

  return (
    <Auxiliary>
      {<Toast />}
      <div className="col-md-9 col-sm-12 col-xs-12 mx-auto panel">
        <div className="text-center py-3">
          <button
            onClick={() => props.back()}
            type="button"
            className="btn btn-lg float-left"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
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
              <div
                id="first_name_feedback"
                className="invalid-feedback is-invisible"
              >
                Please first name is required.
              </div>
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
              <div
                id="last_name_feedback"
                className="invalid-feedback is-invisible"
              >
                Please last name is required.
              </div>
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
              <div
                id="email_feedback"
                className="invalid-feedback is-invisible"
              >
                Please email is required.
              </div>
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
              <div
                id="username_feedback"
                className="invalid-feedback is-invisible"
              >
                Please username is required.
              </div>
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
              <div
                id="password_feedback"
                className="invalid-feedback is-invisible"
              >
                Please password is required.
              </div>
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
              <div
                id="password2_feedback"
                className="invalid-feedback is-invisible"
              >
                Please confirm password is required.
              </div>
            </div>
          </div>
          <div className="form-row">
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
              className="btn btn-color rounded-pill px-5 my-4"
            >
              {isLoading ? "Processing... " : "Create Account "}
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : null}
            </button>
          </div>
        </form>
      </div>
    </Auxiliary>
  );
};

export default Register;
