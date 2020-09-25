import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";
import { EVENTAPP_URL } from '../../../store/constants';
import { Toast, notify } from "../../Helper/notify";
import "react-toastify/dist/ReactToastify.css";

const EventRegistration = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const book = {user_id: null, event_id: null, ticket: 0, phone_number: null}
  const submit = (event) => {
    setIsLoading(true);
    event.persist();
    event.preventDefault();
    book.user_id = props.user.pk;
    book.event_id = props.event.id;
    console.log(book)
    var config = {
      method: 'post',
      url: `${EVENTAPP_URL}event-book/`,
      data : book
    };
    axios(config)
    .then(res => {
      setIsLoading(false);
      if(res.data.status_code === 700) {
        notify(
          res.data.result,
          "error",
          "top-center"
        );
        return;
      }
      else if (res.data.status_code === 670) {
        notify(
          res.data.result,
          "error",
          "top-center"
        );
        return;
      }
      else {
        notify(
          "Booked successfully",
          "success",
          "top-center"
        );
        book.user_id = null;
        book.event_id = null;
        book.ticket = 0;
        book.phone_number = null;
      }
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
    });
  };

  const onChangeHandler = (event) => {
    event.persist();
    event.preventDefault();
    const {id, value} = event.target;
    book[id] = value;
  };

  return (
    <Auxiliary>
      {<Toast />}
      {props.isAuth ? null : (<p className="text-center require">Please either login or register before proceeding. Thanks!</p>)}
      <form className="p-1">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            className="form-control inputBG"
            id="name"
            readOnly={true}
            onChange={(event) => onChangeHandler(event)}
            placeholder="Your Name"
            value={props.user !== null ? props.user.first_name + " " + props.user.last_name : ""}
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
            onChange={(event) => onChangeHandler(event)}
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
            onChange={(event) => onChangeHandler(event)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="time">Event Time</label>
          <select id="time" className="form-control inputBG" 
            name="time"
            onChange={(event) => onChangeHandler(event)}>
            <option defaultValue>Select...</option>
            <option>Morning </option>
            <option>Mid-Morning</option>
            <option>Afternoon</option>
           
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ticket">Ticket Number</label>
          <select id="ticket" className="form-control inputBG" 
            name="ticket"
            onChange={(event) => onChangeHandler(event)}>
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
    </Auxiliary>
  );
};

export default EventRegistration;
