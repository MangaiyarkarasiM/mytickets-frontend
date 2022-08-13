import React, { useState, useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const movieFormValidation = Yup.object().shape({
  name: Yup.string().required("Enter movie name"),
  about: Yup.string()
    .required("Enter the description of the movie")
    .min(20, "Provide the desc with alteast 20 characters"),
  posterUrl: Yup.string().url().required("Enter movie poster url"),
  bannerUrl: Yup.string().url().required("Enter movie banner url"),
  languages: Yup.string().required("Enter available launguages"),
  genre: Yup.string().required("Enter genre"),
  cert: Yup.string().required("Enter cert of the movie"),
  rating: Yup.number(),
  cast: Yup.string().required("Enter cast"),
  duration: Yup.number().required("Enter duration").min(1),
  ticketPrice: Yup.number().required("Enter ticket price"),
  releaseDate: Yup.date().required("Movie release date is required"),
});

function MovieForm(props) {
  //console.log(props)
  const { movies, editMovie, addMovie, setShowEdit, setId } =
    useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const [userID, setUserID] = useState("");

  useEffect(() => {
    //console.log(movies);
    let mov = movies?.filter((m) => m._id === props.id);
    if (mov?.length > 0) {
      let m = { ...mov };
      m[0].languages =
        typeof m[0].languages === "object"
          ? m[0].languages.join(",")
          : m[0].languages;
      m[0].cast =
        typeof m[0].cast === "object" ? m[0].cast.join(",") : m[0].cast;
      m[0].genre =
        typeof m[0].genre === "object" ? m[0].genre.join(",") : m[0].genre;
      setMovie(m[0]);
    }
  }, [props.id]);

  useEffect(() => {
    const ss = sessionStorage.getItem("userID");
    setUserID(ss);
  }, []);

  //return the array id the value is comma separated
  const isCommaSeparated = (val) => {
    if (val.indexOf(",")) {
      return val.split(",");
    }
  };

  const onAddMovie = (value) => {
    //console.log(value);
    let input = { ...value };
    input.languages = isCommaSeparated(value.languages);
    input.genre = isCommaSeparated(value.genre);
    input.cast = isCommaSeparated(value.cast);
    if (props.id) {
      editMovie({ ...input, _id: props.id, changedBy: userID });
    } else {
      addMovie({ ...input, changedBy: userID });
    }
  };

  return (
    <div className="bg-white rounded p-4 my-3">
      <Formik
        initialValues={{
          name: movie ? movie.name : "",
          posterUrl: movie ? movie.posterUrl : "",
          bannerUrl: movie ? movie.bannerUrl : "",
          languages: movie ? movie.languages : "",
          genre: movie ? movie.genre : "",
          about: movie ? movie.about : "",
          cert: movie ? movie.cert : "",
          rating: movie ? movie.rating : "",
          cast: movie ? movie.cast : "",
          duration: movie ? movie.duration : "",
          ticketPrice: movie ? movie.ticketPrice : "",
          releaseDate: movie ? movie.releaseDate : "",
        }}
        onSubmit={onAddMovie}
        validationSchema={movieFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="rounded mt-3">
              <div className="d-flex flex-row justify-content-start column">
                <div className="m-2">
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Movie name
                    </label>
                    <Field
                      name="name"
                      type="text"
                      value={prop.values.name}
                      className="d-block rounded form-control"
                      placeholder="Movie name"
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
                      About the movie
                    </label>
                    <Field
                      name="about"
                      type="text"
                      value={prop.values.about}
                      className="d-block rounded form-control"
                      placeholder="About the movie"
                      size="50"
                    />
                    <ErrorMessage
                      name="about"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Movie poster url
                    </label>
                    <Field
                      name="posterUrl"
                      type="text"
                      value={prop.values.posterUrl}
                      className="d-block rounded form-control"
                      placeholder="Movie poster url"
                      size="50"
                    />
                    <ErrorMessage
                      name="posterUrl"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Movie banner url
                    </label>
                    <Field
                      name="bannerUrl"
                      type="text"
                      value={prop.values.bannerUrl}
                      className="d-block rounded form-control"
                      placeholder="Movie banner url"
                      size="50"
                    />
                    <ErrorMessage
                      name="bannerUrl"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Languages<span className="text-secondary">*</span>
                    </label>
                    <Field
                      name="languages"
                      type="text"
                      value={prop.values.languages}
                      className="d-block rounded form-control"
                      placeholder="Available languages"
                      size="50"
                    />
                    <ErrorMessage
                      name="languages"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Genre<span className="text-secondary">*</span>
                    </label>
                    <Field
                      name="genre"
                      type="text"
                      value={prop.values.genre}
                      className="d-block rounded form-control"
                      placeholder="Genre of the movie"
                      size="50"
                    />
                    <ErrorMessage
                      name="genre"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                </div>
                <div className="m-2">
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Certified
                    </label>
                    <Field
                      name="cert"
                      type="text"
                      value={prop.values.cert}
                      className="d-block rounded form-control"
                      placeholder="Certification eg: UA, U"
                      size="50"
                    />
                    <ErrorMessage
                      name="cert"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">Rating</label>
                    <Field
                      name="rating"
                      type="text"
                      value={prop.values.rating}
                      className="d-block rounded form-control"
                      placeholder="Rating"
                      size="50"
                    />
                    <ErrorMessage
                      name="rating"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Cast and Crew<span className="text-secondary">*</span>
                    </label>
                    <Field
                      name="cast"
                      type="text"
                      value={prop.values.cast}
                      className="d-block rounded form-control"
                      placeholder="Cast"
                      size="50"
                    />
                    <ErrorMessage
                      name="cast"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">Duration</label>
                    <Field
                      name="duration"
                      type="text"
                      value={prop.values.duration}
                      maxLength="3"
                      className="d-block rounded form-control"
                      placeholder="Duration of the movie"
                      size="50"
                    />
                    <ErrorMessage
                      name="duration"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Ticket Price
                    </label>
                    <Field
                      name="ticketPrice"
                      type="text"
                      value={prop.values.ticketPrice}
                      maxLength="3"
                      className="d-block rounded form-control"
                      placeholder="Ticket Price"
                      size="50"
                    />
                    <ErrorMessage
                      name="ticketPrice"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="d-block font-weight-bold">
                      Release Date
                    </label>
                    <Field
                      name="releaseDate"
                      type="date"
                      value={prop.values.releaseDate}
                      className="d-block rounded form-control"
                    />
                    <ErrorMessage
                      name="releaseDate"
                      render={(msg) => (
                        <small className="d-block text-danger">{msg}</small>
                      )}
                    />
                  </div>
                </div>
              </div>
              <small className="d-block mb-2">
                <b>*</b> - Multiple values can be added separated by comma
                <br />
                eg: Tamil,English
                <br />
                Action,Thriller
                <br />
                Rajinikanth,Kamal Haasan
                <br />
              </small>
              {props.message && (
                <small className="d-block text-red mb-2">{props.message}</small>
              )}
              <div className="d-flex justify-content-around">
                {props.id ? (
                  <button
                    type="submit"
                    className="btn btn-outline-primary mr-4"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-outline-primary mr-4"
                  >
                    Add
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    setId("");
                    setShowEdit(false);
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

export default MovieForm;
