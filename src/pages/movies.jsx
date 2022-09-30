import React, { useEffect, useState, useContext } from "react";
import { MovieProvider } from "../context/movieContext";
import MovieForm from "../components/Movie/MovieForm";
import fetchApi from "../utils/fetchApi";
import MovieList from "../components/MovieList/MovieList";
import { GlobalContext } from "../context/globalContext";

function MoviesPage() {
  const { user, movies, getMovie, message, setMessage, onAuthFail } =
    useContext(GlobalContext);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  //getting all movies from backend
  useEffect(() => {
    getMovie();
  }, []);

  //deleting a movie with ID
  const deleteMovie = async (id) => {
    let movie = movies?.filter((m) => {
      return String(m._id) === id;
    });
    let con = window.confirm(
      `Are you sure to delete the movie ${movie[0].name}?`
    );
    if (con) {
      let token = sessionStorage.getItem("token");
      let res = await fetchApi.delete(`/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.statusCode === 401) {
        onAuthFail();
      } else if (res.data.statusCode === 200) {
        getMovie();
        setMessage("");
      } else {
        console.log(res.data);
        setMessage(res.data.message);
      }
    }
  };

  //editing a movie with ID
  const editMovie = async (value) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.put(
      `/movies/${value._id}`,
      { ...value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getMovie();
      setId("");
      setMessage("");
      setShowEdit(false);
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  };

  //adding a new movie
  const addMovie = async (value) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.post(
      "/movies/create-film",
      { ...value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getMovie();
      setId("");
      setMessage("");
      setShowEdit(false);
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  };

  return (
    <>
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
          <>
            {user.role === "admin" ? (
              <>
                <div className="row">
                  <button
                    className="btn btn-outline-primary mt-4 ml-4"
                    onClick={() => {
                      setShowEdit(true);
                    }}
                  >
                    Add Movie
                  </button>
                </div>
                <div
                  className="row"
                  style={{ marginRight: "10%", marginLeft: "10%" }}
                >
                  {showEdit ? (
                    id ? (
                      <>
                        <MovieForm message={message} id={id}></MovieForm>
                      </>
                    ) : (
                      <>
                        <MovieForm message={message}></MovieForm>
                      </>
                    )
                  ) : null}
                </div>
                {message ? <div className="text-danger">{message}</div> : ""}
              </>
            ) : (
              ""
            )}
            <div className="row m-0">
              <MovieList movies={movies} />
            </div>
          </>
        </MovieProvider>
      </div>
    </>
  );
}

export default MoviesPage;
