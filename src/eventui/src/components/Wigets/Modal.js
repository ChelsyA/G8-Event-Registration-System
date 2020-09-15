import React from "react";
import Auxiliary from "../../hoc/Auxiliary";

const Modal = (props) => {
  return (
    <Auxiliary>
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
                {props.title !== ""
                  ? "Education For Racial Equity : " + (props.title + 1)
                  : "OctaVents"}
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
            <div className="modal-body mx-1">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </Auxiliary>
  );
};

export default Modal;
