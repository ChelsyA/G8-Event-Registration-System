import React from "react";
import faker from "faker";
import Auxiliary from "../../../hoc/Auxiliary";

const Profile = (props) => {
  return (
    <Auxiliary>
      <div className="card" style={{width: "18rem"}}>
        <img src={faker.image.avatar()} className="card-img-top" alt="Profile" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#/" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </Auxiliary>
  );
};

export default Profile;
