import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const EventRegistration = (props) => {
  return (
    <Auxiliary>
      <h3 className="form-title font-weight-bold">REGISTER NOW</h3>
      <form className="p-2" method="POST">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              className="form-control inputBG"
              id="name"
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input
              type="email"
              className="form-control inputBG"
              id="email"
              placeholder="E-mail Address"
            />
          </div>
        </div>
        <div className="form-row">
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
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary borderRadius px-5">
            Create Account
          </button>
        </div>
      </form>
    </Auxiliary>
  );
};

export default EventRegistration;
