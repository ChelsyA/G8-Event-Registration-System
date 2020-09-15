import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const EventRegistration = (props) => {
  const submit = (event) => {
    event.persist();
    event.preventDefault();
    console.log(props.user);
  };

  const onChangeHandler = (event) => {
    event.persist();
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <Auxiliary>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticket">Ticket Number</label>
          <select id="ticket" className="form-control inputBG">
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
          // disabled={isDisabled}
          onClick={(event) => submit(event)}
          className="btn btn-color btn-block rounded-pill my-4"
        >
          REGISTER NOW
        </button>
      </form>
    </Auxiliary>
  );
};

export default EventRegistration;
