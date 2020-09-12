import React from "react";

import Auxiliary from "../../../hoc/Auxiliary";

export default Event = (props) => {
  const getData = (data) => {
    props.loadInfo(data);
  };
  return (
    <Auxiliary>
      <div className="col-md-4">
        <div className="card mb-4 shadow-lg mb-5 rounded">
          <img
            className="card-img event-img"
            src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F101214770%2F442451758882%2F1%2Foriginal.20200424-082529?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C14%2C1200%2C600&s=44200171cd4ff501a0762e1042830668"
            alt="..."
          />
          <div className="card-body">
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                  onClick={() =>
                    getData({
                      index: props.info,
                      imageUrl:
                        "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F101214770%2F442451758882%2F1%2Foriginal.20200424-082529?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C14%2C1200%2C600&s=44200171cd4ff501a0762e1042830668",
                    })
                  }
                >
                  View
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Info
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
