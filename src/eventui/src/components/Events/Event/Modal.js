import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { EVENTAPP_URL } from "../../../store/constants";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";
import { feedback } from "../../Helper/utils";

import Cookies from "js-cookie";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Modal = (props) => {
  let csrftoken = Cookies.get("csrftoken");
  const [isTimeAvailable, setIsTimeAvailable] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    user_id: null,
    event_id: null,
    ticket: 0,
    phone_number: null,
    time: null,
  });

  let isValid = false;
  let isSubmit = false;

  const submit = (event) => {
    isSubmit = true;
    event.persist();
    event.preventDefault();
    validate(['time', 'phone_number', 'ticket']);
    if(isValid) {
      setIsLoading(true);
      var config = {
        method: "post",
        url: `${EVENTAPP_URL}event-book/`,
        headers: { "X-CSRFToken": csrftoken },
        data: book,
      };
      axios(config)
      .then((res) => {
        setIsLoading(false);
        if (res.data.status_code === 700) {
          notify(res.data.result, "error", "top-center");
          return;
        } else if (res.data.status_code === 670) {
          notify(res.data.result, "error", "top-center");
          setIsTimeAvailable(false)
          return;
        } else {
          notify("Booked successfully", "success", "top-center");
          reset();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        isSubmit = false;
        console.log(err);
      });
    }
  };

  const reset = () => {
    document.getElementById("phone_number").value = "";
    document.getElementById("ticket").value = "";
    document.getElementById("time").value = "";
    feedback("phone_number", false, "", true);
    feedback("ticket", false, "", true);
    feedback("time", false, "", true);
    setBook({
      user_id: null,
      event_id: null,
      ticket: 0,
      phone_number: null,
      time: null,
    });
  };

  const validate = (ids) => {
    ids.forEach((id) => {
      if (book[id] === null || book[id] === 0) {
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

  let timeX = !isTimeAvailable ? (
      <span className="require float-right">Please change time</span>
    ) : null;
  
  // let isTimeAvailable = book.time === (props.event === null ? "" : props.event.time)

  return (
    <Auxiliary>
      <Toast />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title" id="staticBackdropLabel">
                {props.event !== null ? props.event.title : "OctaVents"}
              </h5>
              <button
                type="button"
                className="btn btn-color rounded-circle "
                data-dismiss="modal"
                aria-label="Close"
                onClick={reset}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-1">
              <form className="p-1">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    className="form-control inputBG"
                    id="name"
                    readOnly={true}
                    placeholder="Your Name"
                    value={
                      props.user !== null
                        ? props.user.first_name + " " + props.user.last_name
                        : ""
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail Address</label>
                  <input
                    type="email"
                    className="form-control inputBG"
                    id="email"
                    placeholder="E-mail Address"
                    readOnly={true}
                    value={props.user !== null ? props.user.email : ""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input
                    type="number"
                    className="form-control inputBG"
                    id="phone_number"
                    placeholder="Phone Number e.g. 0567133569"
                    name="phone_number"
                    onChange={(event) =>
                      setBook({
                        ...book,
                        phone_number: event.target.value,
                        user_id: props.user.pk,
                        event_id: props.event.id,
                      })
                    }
                  />
                  <div
                    id="phone_number_feedback"
                    className="invalid-feedback is-invisible"
                  >
                    Please phone number is required.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time">Event Time</label>
                  {timeX}
                  <select
                    id="time"
                    className="form-control inputBG"
                    name="time"
                    onChange={(event) =>
                      setBook({ ...book, time: event.target.value })
                    }
                  >
                    <option defaultValue>Select...</option>
                    <option>Morning</option>
                    <option>Midmorning</option>
                    <option>Afternoon</option>
                  </select>
                  <div
                    id="time_feedback"
                    className="invalid-feedback is-invisible"
                  >
                    Please time is required.
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ticket">Ticket Number</label>
                  <select
                    id="ticket"
                    className="form-control inputBG"
                    name="ticket"
                    onChange={(event) =>
                      setBook({ ...book, ticket: event.target.value })
                    }
                  >
                    <option defaultValue>Select...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                  <div
                    id="ticket_feedback"
                    className="invalid-feedback is-invisible"
                  >
                    Please ticket is required.
                  </div>
                </div>
                <button
                  disabled={!isTimeAvailable}
                  type="button"
                  onClick={(event) => submit(event)}
                  className="btn btn-color btn-block rounded-pill my-4"
                >
                  {isLoading ? "Processing..." : "BOOK ME!"}{" "}
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-sign-in-alt"></i>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};

export default Modal;
