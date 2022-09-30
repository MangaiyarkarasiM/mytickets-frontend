import React, { useEffect, useState, useContext } from "react";
import fetchApi from "../utils/fetchApi";
import TheaterList from "../components/TheaterList/TheaterList";
import { TheaterProvider } from "../context/theaterContext";
import TheaterForm from "../components/Theater/TheaterForm";
import { GlobalContext } from "../context/globalContext";

function TheatersPage(props) {
  const { theaters, getTheater, message, setMessage, onAuthFail } =
    useContext(GlobalContext);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  //getting all theaters from backend
  useEffect(() => {
    getTheater();
  }, []);

  //deleting a theater with ID
  const deleteTheater = async (id) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.delete(`/theaters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getTheater();
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  };

  //editing a theater with ID
  const editTheater = async (value) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.put(
      `/theaters/${value._id}`,
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
      getTheater();
      setShowEdit(false);
      setId("");
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  };

  //adding a new theater
  const addTheater = async (value) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.post(
      "/theaters/create-theater",
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
      getTheater();
      setShowEdit(false);
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <TheaterProvider
          value={{
            theaters,
            deleteTheater,
            editTheater,
            addTheater,
            setShowEdit,
            setId,
          }}
        >
          <div>
            <div className="row">
              <button
                className="btn btn-outline-primary mt-4 ml-4"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Add Theater
              </button>
            </div>
            <div className="row" style={{ marginRight: "10%", marginLeft: "10%" }}>
              {showEdit ? (
                id ? (
                  <>
                    <TheaterForm id={id}></TheaterForm>
                  </>
                ) : (
                  <>
                    <TheaterForm></TheaterForm>
                  </>
                )
              ) : null}
            </div>
            {message ? <div>{message}</div> : ""}
            <div className="row m-0">
              <TheaterList theaters={theaters} />
            </div>
          </div>
        </TheaterProvider>
      </div>
    </>
  );
}

export default TheatersPage;
