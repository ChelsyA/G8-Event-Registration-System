import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

const Modal = (props) => {
  return (
    <Auxiliary>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        View Event
      </button> */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {props.title !== "" ? "Education For Racial Equity : " + (props.title + 1) : "OctaVents"}
              </h5>
              <button
                type="button"
                className="btn event-color rounded-circle "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              {/* <div className="float-left">
                <button
                  type="button"
                  className="btn btn-danger rounded-circle"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div> */}
              {props.children}
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};

export default Modal;
