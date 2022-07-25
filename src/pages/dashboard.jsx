import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import fetchApi from "../utils/fetchApi";
import Slider from "../components/Slider/Slider";
//import ima from '../assets/ET.jpg'

function DashboardPage(props) {
  let [movies, setMovies] = useState([]);
  let [theaters, setTheaters] = useState([]);

  useEffect(() => {
    getMovie();
    getTheater();
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

  async function getTheater() {
    let res = await fetchApi.get("/theaters");
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setTheaters(res.data.theaters);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <Layout />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <Slider />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div>
              <h3 className="ml-2 mt-2 text-info text-uppercase">
                Movies running
              </h3>
              {movies.map((movie, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 my-4 ml-4 d-flex flex-row border rounded bg-white justifu-content-between"
                  >
                    <div style={{ width: "18rem" }} className="text-uppercase">
                      {movie.name}
                    </div>
                    <div>Rating: {movie.rating}/10</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div>
              <h3 className="ml-2 mt-2 text-info text-uppercase">
                Theaters Available
              </h3>
              {theaters.map((theater, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 my-4 ml-4 d-flex flex-row border rounded bg-white justifu-content-between"
                  >
                    <div style={{ width: "18rem" }} className="text-uppercase">
                      {theater.name}
                    </div>
                    <div>
                      City:{" "}
                      <spam className="text-uppercase">{theater.city}</spam>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
