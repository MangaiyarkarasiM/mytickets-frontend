import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../../utils/fetchApi";
import Layout from "../Layout/Layout";
import Show from "../Show/Show";
import { GlobalContext } from "../../context/globalContext";

function MovieShow() {
  const { onAuthFail } = useContext(GlobalContext);
  const [shows, setShows] = useState([]);
  let [theaters, setTheaters] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getShows();
  }, [id]);

  async function getShows() {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get(`/shows/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setShows(res.data.shows);
      getTheater(res.data.shows);
    } else {
      console.log(res.data);
    }
  }

  async function getTheater(show) {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get("/theaters", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      let theater = res.data.theaters
        .filter((theater) => {
          let avail = false;
          show?.forEach((s) => {
            avail = s.theater === theater._id;
          });
          return avail;
        })
        .map((theater) => {
          show?.forEach((s) => {
            if (s.theater === theater._id) {
              theater.shows.push(s._id);
            }
          });
          return theater;
        });
      //console.log(theater);
      setTheaters(theater);
    } else {
      console.log(res.data);
    }
  }

  return (
    <div>
      <Layout />
      <div className="row">
        {theaters.map((theater) => {
          return (
            <Show theater={theater} shows={shows}>
              {theater.name}
            </Show>
          );
        })}
      </div>
    </div>
  );
}

export default MovieShow;
