import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { EVENTAPP_URL } from "../../../store/constants";
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";

const Modal = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    user_id: null,
    event_id: null,
    ticket: 0,
    phone_number: null,
  });

  const submit = (event) => {
    setIsLoading(true);
    event.persist();
    event.preventDefault();
    var config = {
      method: "post",
      url: `${EVENTAPP_URL}event-book/`,
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
          return;
        } else {
          notify("Booked successfully", "success", "top-center");
          reset();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const reset = () => {
    document.getElementById('phone_number').value = "";
    document.getElementById('ticket').value = "";
    setBook({
      user_id: null,
      event_id: null,
      ticket: 0,
      phone_number: null,
    });
  }

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
                    // onChange={(event) => onChangeHandler(event)}
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
                    // onChange={(event) => onChangeHandler(event)}
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
                    // onChange={(event) => onChangeHandler(event)}
                    onChange={(event) =>
                      setBook({ ...book, phone_number: event.target.value, user_id: props.user.pk, event_id: props.event.id })
                    }
                  />
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
                </div>
                <button
                  type="button"
                  disabled={isLoading || !props.isAuth ? true : false}
                  onClick={(event) => submit(event)}
                  className="btn btn-color btn-block rounded-pill my-4"
                >
                  BOOK ME!
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
