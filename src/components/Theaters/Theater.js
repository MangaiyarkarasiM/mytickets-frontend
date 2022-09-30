import React, { useContext } from "react";
import { TheaterContext } from "../../context/theaterContext";

const capitilizeInput = (sentence) => {
  let res = String(sentence)
    .split(" ")
    ?.map((r) => {
      return r.charAt(0).toUpperCase() + r.slice(1);
    });
  return res.join(" ");
};

function Theater(props) {
  //console.log(props)
  const { deleteTheater, setShowEdit, setId } = useContext(TheaterContext);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 col-xl-3 my-4 p-0">
      <div
        className="card align-items-center justify-content-center"
        style={{ width: "14rem" }}
      >
        <div className="card-body">
          <div className="title">
            <div className="font-weight-bold text-dark mb-2">
              {capitilizeInput(props.theater.name)}
            </div>
          </div>
          <div>
            <div className="font-weight-bold text-secondary mb-2">
              {capitilizeInput(props.theater.addressLine1)}
            </div>
          </div>
          <div>
            <div className="font-weight-bold text-secondary mb-2">
              {capitilizeInput(props.theater.addressLine2)}
            </div>
          </div>
          <div>
            <div className="font-weight-bold text-secondary mb-2">
              {capitilizeInput(props.theater.city)}
            </div>
          </div>
          <div>
            <div className="font-weight-bold text-secondary mb-2">
              {capitilizeInput(props.theater.state)}
            </div>
          </div>
          <div>
            <div className="font-weight-bold text-secondary mb-2">
              {props.theater.pincode} - {capitilizeInput(props.theater.country)}
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-outline-warning py-1 px-2 mr-4"
              onClick={() => {
                setShowEdit(true);
                setId(props.theater._id);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger py-1 px-2"
              onClick={() => {
                deleteTheater(props.theater._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theater;
