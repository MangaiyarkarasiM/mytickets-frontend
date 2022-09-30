import React, { useContext } from "react";
import { ShowContext } from "../../context/showContext";
import { GlobalContext } from "../../context/globalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const showFormValidation = Yup.object().shape({
  film: Yup.string().required("Select a movie"),
  theater: Yup.string().required("Select a theater"),
  date: Yup.date().required("Show date is required"),
  startTime: Yup.string()
    .matches(
      "[0-9]{2}:[0-9]{2}:[0-9]{2}",
      "Please enter the time in HH:mm:ss format"
    )
    .required("Show start time is required"),
  endTime: Yup.string()
    .matches(
      "[0-9]{2}:[0-9]{2}:[0-9]{2}",
      "Please enter the time in HH:mm:ss format"
    )
    .required("Show end time is required"),
});

const ShowForm = (props) => {
  //console.log(props)
  const { addShow, editShow, setShowModal, setShow } = useContext(ShowContext);
  const { user, movies, theaters } = useContext(GlobalContext);

  const initVal = props.show._id
    ? {
        film: props.show?.film._id ? props.show?.film._id : "",
        theater: props.show?.theater._id ? props.show?.theater._id : "",
        date: props.show?.date ? props.show?.date.slice(0, 10) : "",
        startTime: props.show?.startTime ? props.show?.startTime : "",
        endTime: props.show?.endTime ? props.show?.endTime : "",
      }
    : {};

  const onSubmit = (value) => {
    console.log(value);
    if (props.show._id) {
      editShow({ ...value });
    } else {
      addShow({ ...value, changedBy: user.userId });
    }
  };

  return (
    <>
      <Formik
        initialValues={initVal}
        onSubmit={onSubmit}
        validationSchema={showFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="d-flex flex-column align-items-start justify-content-center border-info rounded mt-3 ml-4">
              <div className="mb-4">
                <label className="d-block font-weight-bold">Movie</label>
                <Field name="film" as="select">
                  <option value="" label="Select a movie">
                    Select a movie
                  </option>
                  {movies?.map((movie) => {
                    return (
                      <option
                        key={movie._id}
                        value={movie._id}
                        label={movie.name}
                      >
                        {movie.name}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="film"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Theater</label>
                <Field name="theater" as="select">
                  <option value="" label="Select a theater">
                    Select a theater
                  </option>
                  {theaters?.map((theater) => {
                    let theaterName = `${theater.name}, ${theater.city}`;
                    return (
                      <option
                        key={theater._id}
                        value={theater._id}
                        label={theaterName}
                      >
                        {theaterName}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="theater"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">Date</label>
                <Field
                  name="date"
                  type="date"
                  min={new Date(
                    Date.now() -
                      new Date(Date.now()).getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 10)}
                  value={prop.values.date}
                  className="d-block rounded form-control"
                />
                <ErrorMessage
                  name="date"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">
                  Start time{" "}
                  <small className="font-weight-bold">(Format HH:mm:ss)</small>
                </label>
                <Field
                  name="startTime"
                  type="input"
                  value={prop.values.startTime}
                  className="d-block rounded form-control"
                />
                <ErrorMessage
                  name="startTime"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="d-block font-weight-bold">
                  End time{" "}
                  <small className="font-weight-bold">(Format HH:mm:ss)</small>
                </label>
                <Field
                  name="endTime"
                  type="input"
                  value={prop.values.endTime}
                  className="d-block rounded form-control"
                />
                <ErrorMessage
                  name="endTime"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              {props.message && (
                <small className="d-block text-red mb-2">{props.message}</small>
              )}
              <div className="d-flex justify-content-between ml-5">
                {props.show._id ? (
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
                    setShow({});
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ShowForm;
