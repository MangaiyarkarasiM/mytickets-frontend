import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { GlobalContext } from "../context/globalContext";

const MoviePage = () => {
  let { getMovieWithId } = useContext(GlobalContext);
  const [movie, setMovie] = useState({});
  let { id } = useParams();

  async function getMovie(id) {
    setMovie(await getMovieWithId(id));
  }

  useEffect(() => {
    getMovie(id);
  }, [id]);

  const calculateDuration = (min) => {
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  return (
    <>
      <div className="container-fluid">
        <div
          style={{
            backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 85%, rgb(26, 26, 26) 100%),url(${movie.bannerUrl})`,
            minHeight: "25rem",
          }}
        >
          <div className="d-flex p-5">
            <div>
              <img
                className="rounded"
                src={movie.posterUrl}
                alt={movie.name}
                style={{ minHeight: "25rem", maxHeight: "25rem" }}
              ></img>
            </div>
            <div
              className="text-white ml-5 mt-4"
              style={{ fontSize: "1.2rem", fontFamily: "sans-serif" }}
            >
              <p
                className="font-wight-bold mb-2"
                style={{ fontSize: "2.7rem" }}
              >
                {movie.name}
              </p>
              <div className="mb-3">⭐ {movie.rating}</div>
              <div className="mb-3">
                {movie.languages?.map((lang, index) => {
                  return (
                    <span
                      key={index}
                      className="bg-light text-dark text-center rounded mr-2 p-2"
                    >
                      {lang}
                    </span>
                  );
                })}
              </div>
              <div className="mb-3">
                {movie.genre?.map((gnr, index) => {
                  gnr = movie.genre.length !== index + 1 ? gnr + ` • ` : gnr;
                  return <span key={index}>{gnr}</span>;
                })}
              </div>
              <div className="mb-3">
                <>
                  <span>{calculateDuration(movie.duration)}</span>
                  <span> • </span>
                  <span>{movie.cert}</span>
                  <span> • </span>
                  <span>
                    {moment(movie.releaseDate).format("DD MMM, YYYY")}
                  </span>
                </>
              </div>
              <div className="mt-5">
                <Link
                  to={`/buytickets/${movie._id}`}
                  className="btn btn-danger btn-lg px-5"
                >
                  Book Tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container my-4">
        <div className="mb-2">
          <h3 className="text-dark">About the movie</h3>
          <p>{movie.about}</p>
        </div>
        <hr></hr>
        <div>
          <h3 className="mb-4">Cast and Crew</h3>
          <div>
            {movie.cast?.map((cc, index) => {
              return (
                <span key={index} className="p-1">
                  <a
                    className="bg-dark text-white px-3 py-2 rounded-pill text-center"
                    href={`https://www.google.com/search?q=${cc}`}
                    alt={cc}
                    target="blank"
                  >
                    {cc}
                  </a>
                  &nbsp;
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MoviePage;
