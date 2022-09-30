import React, { useContext } from "react";
import Slider from "../components/Slider/Slider";
import { GlobalContext } from "../context/globalContext";

function DashboardPage() {
  const { theaters, movies } = useContext(GlobalContext);

  return (
    <>
      <div className="container-fluid">
        <Slider />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12"></div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div>
              <h3 className="ml-2 mt-2 text-danger">Movies</h3>
              {movies.map((movie, index) => {
                return (
                  <div
                    key={index}
                    className="p-3 my-4 ml-4 d-flex flex-row border rounded bg-white justifu-content-between"
                  >
                    <div style={{ width: "18rem" }} className="text-uppercase">
                      {movie.name}
                    </div>
                    <div>Rating: {movie.rating}/5</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div>
              <h3 className="ml-2 mt-2 text-danger">Theaters</h3>
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
                      <span className="text-uppercase">{theater.city}</span>
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
