import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { GlobalContext } from "../context/globalContext";
import fetchApi from "../utils/fetchApi";

const MovieShowPage = () => {
  let { getMovieWithId } = useContext(GlobalContext);
  const [movie, setMovie] = useState({});
  const [shows, setShows] = useState([]);
  const [showsByTheater, setShowsByTheater] = useState({});
  let { id } = useParams();

  async function getShows() {
    let res = await fetchApi.get(`/shows/${id}`);
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setShows(res.data.shows);
      setShowsByTheater(res.data.showsByTheater);
    } else {
      console.log(res.data);
    }
  }

  async function getMovie(id) {
    setMovie(await getMovieWithId(id));
  }

  useEffect(() => {
    getMovie(id);
    getShows();
  }, [id]);

  const calculateDuration = (min) => {
    return `${Math.floor(min / 60)}h ${min % 60}m`;
  };

  return (
    <>
      <div className="container-fliud">
        <section className="bg-black text-white" style={{ minHeight: "27vh" }}>
          <div className="d-flex py-4 align-items-center justify-content-between">
            <div className="d-flex ml-3 flex-column align-items-start justify-content-center">
              <h1 className="mb-4">{movie.name}</h1>
              <div style={{ fontSize: "0.9rem" }}>
                <div className="d-inline border rounded-circle p-1">
                  {movie.cert}
                </div>
                <div className="d-inline mx-2">⭐ {movie.rating}</div>
                <div className="d-inline ml-2">
                  {movie.genre?.map((gnr, index) => {
                    return (
                      <span
                        key={index}
                        style={{ fontSize: "0.7rem" }}
                        className="mr-2 text-secondary text-uppercase border border-secondary rounded-pill px-2 py-1"
                      >
                        {gnr}
                      </span>
                    );
                  })}
                </div>
                <div className="d-inline mx-2">
                  {moment(movie.releaseDate).format("DD MMM, YYYY")}
                </div>
                <div className="d-inline mx-2">
                  <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                  {calculateDuration(movie.duration)}
                </div>
              </div>
            </div>
            <div className="d-flex mr-3 flex-column">
              {movie.cast?.map((cc, index) => {
                return (
                  <div key={index} className="p-1">
                    <a
                      className="text-white"
                      href={`https://www.google.com/search?q=${cc}`}
                      alt={cc}
                      target="blank"
                    >
                      {cc}
                    </a>
                    &nbsp;
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="bg-light m-3 p-3">
          <div>
            {Object.keys(showsByTheater).length > 0 ? (
              Object.keys(showsByTheater)?.map((th) => {
                let shows = showsByTheater[th]?.filter((s) => {
                  let cd = moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss");
                  let d = moment(
                    `${s.date.slice(0, 10)}T${s.startTime}`
                  ).format("YYYY-MM-DDTHH:mm:ss");
                  return moment(String(cd)).isBefore(String(d));
                });
                return (
                  <>
                    {shows.length > 0 ? (
                      <div
                        key={th}
                        className="d-flex flex-row mb-3 align-items-center"
                      >
                        <>
                          <h6 className="w-25 ml-2">{shows[0].theater.name}</h6>
                          <div style={{ fontSize: "0.85rem" }} className="d-flex">
                            {shows?.map((show, index) => {
                              return (
                                <Link
                                  key={show._id}
                                  to={`/booktickets/${show._id}`}
                                  className="text-decoration-none mr-3"
                                >
                                  <div className="text-success border rounded px-4 py-2 text-center" style={{maxWidth:"8rem",minWidth:"8rem"}}>
                                    <div
                                      key={index}
                                      className="d-flex flex-column"
                                    >
                                      <div>
                                        {moment(
                                          String(show.date.slice(0, 10))
                                        ).format("DD-MM")}
                                      </div>
                                      <div>
                                        {moment(
                                          `1970-01-01T${show.startTime}`
                                        ).format("h:mm A")}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </>
                      </div>
                    ) : null}
                  </>
                );
              })
            ) : (
              <div>No shows are currently scheduled, please visit later</div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieShowPage;
