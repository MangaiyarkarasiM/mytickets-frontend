import React from "react";
import Movie from "../Movies/Movie";

function MovieList(props) {
  return (
    <>
      {props.movies.map((movie, index) => {
        return <Movie key={index} movie={movie} />;
      })}
    </>
  );
}

export default MovieList;
