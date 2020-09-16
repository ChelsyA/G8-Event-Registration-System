import React, { useState } from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import axios from "axios";

const EventRegistration = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const book = {userId: null, eventId: null, ticket: 0, phone_number: null}
  const submit = (event) => {
    event.persist();
    event.preventDefault();
    book.userId = props.user.pk;
    book.eventId = props.event.id;
    // axios.post("", book)
  };

  const onChangeHandler = (event) => {
    event.persist();
    event.preventDefault();
    const {id, value} = event.target;
    book[id] = value;
  };

  return (
    <Auxiliary>
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
            type="text"
            className="form-control inputBG"
            id="phone_number"
            placeholder="Phone Number"
            name="phone_number"
            onChange={(event) => onChangeHandler(event)}
          />
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
