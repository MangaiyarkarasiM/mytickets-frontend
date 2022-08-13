import React, { useEffect, useState, useContext } from "react";
import { ShowProvider } from "../context/showContext";
import ShowForm from "../components/Show/ShowForm";
import fetchApi from "../utils/fetchApi";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from "../context/globalContext";
import moment from "moment";

function ShowsPage(props) {
  const { message, setMessage } = useContext(GlobalContext);
  const [shows, setShows] = useState([]);
  const [show, setShow] = useState({});
  const [showModal, setShowModal] = useState(false);

  const getShows = async () => {
    let res = await fetchApi.get("/shows");
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      setShows(res.data.shows);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  //deleting a show with ID
  const deleteShow = async (id) => {
    //console.log(id);
    let res = await fetchApi.delete(`/shows/${id}`);
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      getShows();
      //setMessage(res.data.message)
    } else {
      console.log(res.data);
    }
  };

  //editing a show with ID
  const editShow = async (value) => {
    let res = await fetchApi.put(`/shows/${show._id}`, { ...value });
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      getShows();
      setShowModal(false);
      setShow({});
      setMessage("");
    } else {
      setMessage(res.data.message);
      console.log(res.data);
    }
  };

  //adding a new show
  const addShow = async (value) => {
    console.log(value);
    let res = await fetchApi.post("/shows/create-show", { ...value });
    //console.log(res.data);
    if (res.data.statusCode === 200) {
      let resSeat = await fetchApi.post("/seatings/create-seating", {
        show: res.data.details._id,
      });
      if (resSeat.data.statusCode === 200) {
        getShows();
        setShowModal(false);
        setMessage("");
      } else {
        let res = await fetchApi.delete(`/shows/${res.data.details._id}`);
        setMessage("Someting went wrong, please try again later");
        console.log(res.data);
      }
    } else {
      setMessage(res.data.message);
      console.log(res.data);
    }
  };

  return (
    <>
      <div className="container-xl" style={{ minHeight: "80vh" }}>
        <ShowProvider
          value={{
            addShow,
            editShow,
            setShowModal,
            setShow,
          }}
        >
          <div className="row">
            <button
              className="btn btn-outline-primary my-4 ml-4"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add Show
            </button>
          </div>
          <div className="row">
            <div className="table-responsive">
              <table className="table border">
                <thead className="bg-black text-white">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Movie Name</th>
                    <th scope="col">Theater Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Show Start Time</th>
                    <th scope="col">Show End Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Changed by</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {shows?.map((show, index) => {
                    let isComplete =
                      moment(show.date) <= moment()
                        ? "Complete"
                        : "Yet to Start";
                    return (
                      <tr key={show._id}>
                        <td>{index + 1}</td>
                        <td>{show.film?.name}</td>
                        <td>{`${show.theater?.name}, ${show.theater?.city}`}</td>
                        <td>{moment(show.date).format("DD-MM-YYYY")}</td>
                        <td>{show.startTime}</td>
                        <td>{show.endTime}</td>
                        <td>{isComplete}</td>
                        <td>{show.changedBy?.name}</td>
                        <td>
                          <button
                            className="btn btn-outline-success p-0 py-1 px-2"
                            onClick={() => {
                              setShow(show);
                              setShowModal(true);
                            }}
                            disabled={isComplete === "Complete"}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger p-0 py-1 px-2"
                            onClick={() => {
                              deleteShow(show._id);
                            }}
                            disabled={isComplete === "Complete"}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            open={showModal}
            title={show._id ? "Edit Show" : "Add Show"}
            onClose={() => {
              setShow({});
              setShowModal(false);
            }}
          >
            <ShowForm
              setShowModal={setShowModal}
              show={show}
              message={message}
            ></ShowForm>
          </Modal>
        </ShowProvider>
      </div>
    </>
  );
}

export default ShowsPage;
