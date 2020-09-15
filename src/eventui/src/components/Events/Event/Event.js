import React from "react";

import Auxiliary from "../../../hoc/Auxiliary";

export default Event = (props) => {
  const getData = () => {
    props.loadInfo(props.eventInfo);
  };
  return (
    <Auxiliary>
      <div className="col-sm-6">
        <div className="card mb-4 bg-white shadow-lg rounded-0">
          <div className="card-body">
            <h5 className="card-title lead">{props.eventInfo !== null ? props.eventInfo.title : ""}</h5>
            <p className="card-text">
              <strong>SPEAKER: </strong> {props.eventInfo !== null ? props.eventInfo.speaker : ""}
            </p>
            <p className="card-text">
              <strong>LOCATION: </strong> {props.eventInfo !== null ? props.eventInfo.location : ""}
            </p>
            <p className="card-text">
              <strong>TIME: </strong> {props.eventInfo !== null ? props.eventInfo.title : ""}
            </p>
            <p className="card-text">
              <strong>ROOM CAPACITY: </strong> {props.eventInfo !== null ? props.eventInfo.room_capacity : ""}
            </p>
            <p className="card-text">
              <strong>TAG LINE: </strong> {props.eventInfo !== null ? props.eventInfo.tagline : ""}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-color btn-primary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                  onClick={getData}
                >
                  Book now
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                >
                  View info
                </button>
              </div>
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};
