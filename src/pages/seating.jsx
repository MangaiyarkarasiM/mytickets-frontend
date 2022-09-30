import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import moment from "moment";
import OrderSummary from "../components/Order/OrderSummary";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from "../context/globalContext";

const Seatingpage = () => {
  const { onAuthFail } = useContext(GlobalContext);
  const [seating, setSeating] = useState({});
  const [show, setShow] = useState({});
  const [seatsSelected, setSeatsSelected] = useState([]);
  const [price, setPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState({});
  let { id } = useParams();
  const letter = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
  };

  async function getShow(id) {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get(`/shows/show/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setShow(res.data.show);
      // console.log(res.data.show);
    } else {
      console.log(res.data);
    }
  }

  async function getSeating(id) {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get(`/seatings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setSeating(res.data.seatings);
      //console.log(res.data.seatings);
      getShow(res.data.seatings.show._id);
    } else {
      console.log(res.data);
    }
  }

  useEffect(() => {
    getSeating(id);
  }, [id]);

  function onSelection(seat) {
    setSeatsSelected((seatsSelected) => {
      let seats = [...seatsSelected];
      if (seats.indexOf(seat) < 0) {
        seats.push(seat);
        setPrice((price) => {
          return price + show.film.ticketPrice;
        });
      } else {
        seats.splice(seats.indexOf(seat), 1);
        setPrice((price) => {
          return price - show.film.ticketPrice;
        });
      }
      //console.log(seats);
      return seats;
    });
  }

  async function onPay() {
    let amount = seatsSelected.length * 8 + price;
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.post(
      "/razorpay/create-order",
      { amount },
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
      setOrder(res.data.order);
      setShowModal(true);
    } else {
      console.log(res.data);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <section className="bg-black pt-3" style={{ minHeight: "14vh" }}>
          <div className="d-flex flex-column justify-content-center align-items-start ml-3">
            <div className="text-white pb-2">
              <div>
                {show.film?.name}{" "}
                <small className="border rounded-circle p-1 font-weight-bold">
                  {show.film?.cert}
                </small>
              </div>
            </div>
            <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row flex-xl-row text-white-50">
              <div className="text-capitalize mr-2">
                {show.theater?.name}: {show.theater?.city}
                <span className="ml-2">|</span>
              </div>
              <div>
                {moment(
                  new Date(`${show?.date?.slice(0, 10)}T${show?.startTime}`)
                ).calendar()}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-light w-100 pb-3 mb-3">
          <div
            className="d-flex justify-conetent-center align-items-center flex-column"
            style={{ marginRight: "20%", marginLeft: "20%" }}
          >
            <div className="text-secondary mt-3">
              Rs.{show.film?.ticketPrice} per ticket
            </div>
            <div className="mt-3">
              <table>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => {
                    return (
                      <tr key={r}>
                        <span className="mr-3 text-secondary">{letter[r]}</span>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => {
                          let dis =
                            seating.seatsBooked?.indexOf(letter[r] + t) > -1;
                          let sel = seatsSelected?.indexOf(letter[r] + t) > -1;
                          return (
                            <td key={letter[r] + t} className="">
                              <button
                                disabled={dis}
                                className={
                                  dis
                                    ? "seat-button sold btn btn-secondary p-0 mx-1 my-1 px-1"
                                    : sel
                                    ? "seat-button btn btn-success p-0 mx-1 my-1 px-1"
                                    : "seat-button btn btn-outline-success p-0 mx-1 my-1 px-1"
                                }
                                onClick={() => {
                                  onSelection(letter[r] + t);
                                }}
                              >
                                {t}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3 d-flex justify-conetent-center align-items-center flex-column">
              <div>
                <svg
                  width="400"
                  height="10"
                  style={{ marginLeft: "25%", marginRight: "25%" }}
                >
                  <rect
                    width="200"
                    height="10"
                    style={{
                      fill: "rgb(200,200,255)",
                      strokeWidth: "1",
                      stroke: "rgb(0,0,0)",
                    }}
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>
              <div className="my-3">All eyes this way please!</div>
            </div>
          </div>
        </section>
        <section
          className="bg-light z-index-1 w-100 fixed-bottom"
          style={{ height: "32px" }}
        >
          <div className="d-flex justify-content-center align-items-center my-1">
            <div className="d-flex justify-content-center align-items-center">
              <span className="legend sold border border-secondary bg-secondary mr-2"></span>
              <span>Sold</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span className="legend border border-success bg-light mr-2"></span>
              <span>Available</span>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span className="legend border border-success bg-success mr-2"></span>
              <span>Selected</span>
            </div>
          </div>
        </section>
        {!showModal && seatsSelected.length > 0 && (
          <section
            className="bg-light z-index-2 w-100 fixed-bottom"
            style={{ height: "40px" }}
          >
            <div className="d-flex justify-content-center align-items-center my-1">
              <button
                className="btn btn-outline-danger px-5 py-0 py-1"
                onClick={onPay}
              >
                Proceed to Pay Rs.{price}
              </button>
            </div>
          </section>
        )}
      </div>
      <Modal
        open={showModal}
        title="Order Summary"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <OrderSummary
          setShowModal={setShowModal}
          seatsSelected={seatsSelected}
          show={show}
          price={price}
          seating={seating}
          order={order}
          setSeatsSelected={setSeatsSelected}
        ></OrderSummary>
      </Modal>
    </>
  );
};

export default Seatingpage;
