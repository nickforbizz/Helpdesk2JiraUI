import React, { useState } from "react";

export default function Index(props) {

  const [show, setShow] = useState(props.isOpen);

 
if (props.isOpen !== show) {
    setShow(props.isOpen);        
}

  return (
    <>
        <div
          className={
            show ? "modal d-block fade show" : "modal d-none fade"
          }
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {props.title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.close()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{props.children}</div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => props.close()}
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
    </>
  );
}
