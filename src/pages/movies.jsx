import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { MovieProvider } from "../context/movieContext";
import MovieForm from "../components/Movie/MovieForm";
import fetchApi from "../utils/fetchApi";
import MovieList from "../components/MovieList/MovieList";

function MoviesPage(props) {
  const [role, setRole] = useState("");

  let [message, setMessage] = useState("");
  let [movies, setMovies] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const ss = sessionStorage.getItem("role");
    setRole(ss);
  }, []);

  //getting all movies from backend
  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    let res = await fetchApi.get("/movies");
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setMovies(res.data.movies);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  }

  //deleting a movie with ID
  const deleteMovie = async (id) => {
    let res = await fetchApi.delete(`/movies/${id}`);
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      getMovie();
      //setMessage(res.data.message)
    } else {
      console.log(res.data);
    }
  };

  //editing a movie with ID
  const editMovie = async (value) => {
    //console.log(value);
    let res = await fetchApi.put(`/movies/${value._id}`, { ...value });
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      getMovie();
      setShowEdit(false);
      setId("");
      //setMessage(res.data.message)
    } else {
      console.log(res.data);
    }
  };

  //adding a new movie
  const addMovie = async (value) => {
    let res = await fetchApi.post("/movies/create-film", { ...value });
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      getMovie();
      setShowEdit(false);
      //setMessage(res.data.message)
    } else {
      console.log(res.data);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <Layout />
      </div>
      <div className="container">
        <MovieProvider
          value={{
            movies,
            deleteMovie,
            editMovie,
            addMovie,
            setShowEdit,
            setId,
          }}
        >
          <div>
            {role === "admin" ? (
              <div className="row">
                <button
                  className="btn btn-primary mt-4 ml-4"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Add Movie
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="row">
              {showEdit ? (
                id ? (
                  <div>
                    <MovieForm id={id}></MovieForm>
                  </div>
                ) : (
                  <div>
                    <MovieForm></MovieForm>
                  </div>
                )
              ) : null}
            </div>
            {message ? <div className="text-danger">{message}</div> : ""}
            <div>
              <MovieList movies={movies} />
            </div>
          </div>
        </MovieProvider>
      </div>
    </>
  );
}

export default MoviesPage;
