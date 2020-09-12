import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const EventRegistration = (props) => {
  return (
    <Auxiliary>
      <div className="row">
        <div className="col-md-8">
          <img src={props.data.imageUrl} alt="..." className="card-img event-img" />
        </div>
        <div className="col-md-4 col-sm-10 col-xs-6 mx-auto panel">
          <div className="text-center py-4">
            <h3 className="form-title font-weight-bold">REGISTER NOW</h3>
          </div>
          <form method="POST" className="p-1">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control inputBG"
                id="name"
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail Address</label>
              <input
                type="email"
                className="form-control inputBG"
                id="email"
                placeholder="E-mail Address"
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
              // disabled={isDisabled}
              // onClick={(event) => submit(event)}
              className="btn btn-primary btn-block rounded-pill my-4"
            >
              REGISTER NOW
            </button>
            {/* <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <a href="#/" className="link">
                Sign up!
              </a>
            </p>
          </div> */}
          </form>
        </div>
      </div>
    </Auxiliary>
  );
};

export default EventRegistration;
