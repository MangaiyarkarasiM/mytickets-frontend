import React, { useState, useEffect, useContext } from "react";
import fetchApi from "../utils/fetchApi";
import moment from "moment";
import { GlobalContext } from "../context/globalContext";

function BookingsPage() {
  const { user, onAuthFail } = useContext(GlobalContext);
  let [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    let token = sessionStorage.getItem("token");
    let res =
      user.role === "admin"
        ? await fetchApi.get("/bookings", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
        : await fetchApi.get(`/bookings/user/${user.userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setBookings(res.data.bookings);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: "80vh" }}>
        <div className="row">
          <div className="table-responsive mt-3">
            <table className="table border">
              <thead className="bg-black text-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User name</th>
                  <th scope="col">User email</th>
                  <th scope="col">Movie Name</th>
                  <th scope="col">Theater Name</th>
                  <th scope="col">Show Date</th>
                  <th scope="col">Show Start Time</th>
                  <th scope="col">Show End Time</th>
                  <th scope="col">Booked Date</th>
                  <th scope="col">Seats Booked</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking, index) => {
                  return (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{booking.film.name}</td>
                      <td>{`${booking.theater.name}, ${booking.theater.city}`}</td>
                      <td>{moment(booking.show.date).format("DD-MM-YYYY")}</td>
                      <td>{booking.show.startTime}</td>
                      <td>{booking.show.endTime}</td>
                      <td>{moment(booking.bookedDate).format("DD-MM-YYYY")}</td>
                      <td>
                        {booking.seatsBooked?.map((s) => {
                          return <span key={s}>{s} </span>;
                        })}
                      </td>
                      <td>{booking.amountPaid}</td>
                      <td>{booking.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingsPage;
