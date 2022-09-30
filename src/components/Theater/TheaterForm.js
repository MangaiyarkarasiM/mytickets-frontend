import React, { useState, useContext, useEffect } from "react";
import { TheaterContext } from "../../context/theaterContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const theaterFormValidation = Yup.object().shape({
  name: Yup.string().required("Enter theater name"),
  addressLine1: Yup.string().required("Enter address"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Enter city"),
  state: Yup.string().required("Enter state"),
  pincode: Yup.number().required("Enter pincode"),
  country: Yup.string().required("Enter country"),
});

function TheaterForm(props) {
  //console.log(props)
  const { theaters, editTheater, addTheater, setShowEdit, setId } =
    useContext(TheaterContext);
  const [theater, setTheater] = useState({});
  const [userID, setUserID] = useState("");
  useEffect(() => {
    let thea = theaters?.filter((t) => t._id === props.id);
    if (thea) {
      setTheater(...thea);
    }
  }, [props.id]);

  useEffect(() => {
    const ss = sessionStorage.getItem("userID");
    setUserID(ss);
  }, []);

  const onAddTheater = (value) => {
    //console.log(value);
    if (props.id) {
      editTheater({ ...value, _id: props.id, createdBy: userID });
      setShowEdit(false);
      setId(0);
    } else {
      addTheater({ ...value, createdBy: userID });
      setShowEdit(false);
    }
  };

  return (
    <div className="bg-white rounded p-4 my-3">
      <Formik
        initialValues={{
          name: theater ? theater.name : "",
          addressLine1: theater ? theater.addressLine1 : "",
          addressLine2: theater ? theater.addressLine2 : "",
          city: theater ? theater.city : "",
          state: theater ? theater.state : "",
          pincode: theater ? theater.pincode : "",
          country: theater ? theater.country : "",
        }}
        onSubmit={onAddTheater}
        validationSchema={theaterFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="rounded mt-3">
              <div className="d-flex flex-row justify-content-start column">
                <div className="m-2">
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Theater name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      value={prop.values.name}
                      className="d-block rounded form-control"
                      placeholder="Theater name"
                      size="50"
                    />
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Address Line1
                    </label>
                    <Field
                      name="addressLine1"
                      type="text"
                      value={prop.values.addressLine1}
                      className="d-block rounded form-control"
                      placeholder="Address"
                      size="50"
                    />
                    <ErrorMessage
                      name="addressLine1"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Address Line2
                    </label>
                    <Field
                      name="addressLine2"
                      type="text"
                      value={prop.values.addressLine2}
                      className="d-block rounded form-control"
                      placeholder="Address"
                      size="50"
                    />
                    <ErrorMessage
                      name="addressLine2"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">City</label>
                    <Field
                      name="city"
                      type="text"
                      value={prop.values.city}
                      className="d-block rounded form-control"
                      placeholder="City"
                      size="50"
                    />
                    <ErrorMessage
                      name="city"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">State</label>
                    <Field
                      name="state"
                      type="text"
                      value={prop.values.state}
                      className="d-block rounded form-control"
                      placeholder="State"
                      size="50"
                    />
                    <ErrorMessage
                      name="state"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">Pin Code</label>
                    <Field
                      name="pincode"
                      type="text"
                      value={prop.values.pincode}
                      maxLength="6"
                      minLength="6"
                      className="d-block rounded form-control"
                      placeholder="Pin Code"
                      size="50"
                    />
                    <ErrorMessage
                      name="pincode"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">Country</label>
                    <Field
                      name="country"
                      type="text"
                      value={prop.values.country}
                      className="d-block rounded form-control"
                      placeholder="Country"
                      size="50"
                    />
                    <ErrorMessage
                      name="country"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around">
                {props.id ? (
                  <button type="submit" className="btn btn-primary mr-4">
                    Update
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary mr-4">
                    Add
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    setShowEdit(false);
                    setId("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default TheaterForm;
