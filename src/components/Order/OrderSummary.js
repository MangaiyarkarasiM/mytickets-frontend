import React, { useState, useEffect, useContext } from "react";
import fetchApi from "../../utils/fetchApi";
import { GlobalContext } from "../../context/globalContext";
import moment from "moment";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const OrderSummary = (props) => {
  const { user, onAuthFail } = useContext(GlobalContext);
  const [userDetails, setUserDetails] = useState({});

  async function getUser() {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get(`/users/${user.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setUserDetails(res.data.user);
    } else {
      console.log(res.data);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function handleSuccess(rzpres) {
    let booking = {
      user: user.userId,
      film: props.show.film._id,
      theater: props.show.theater._id,
      show: props.show._id,
      bookedDate: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      seatsBooked: props.seatsSelected,
      amountPaid: props.order.amount / 100,
      status: "Paid",
      razorPayOrderId: rzpres.razorpay_order_id,
      razorPayPaymentId: rzpres.razorpay_payment_id,
    };
    let seating = { ...props.seating };
    seating.seatsBooked.push(...props.seatsSelected);
    seating.show = seating.show._id;
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.post("/bookings/create-booking", booking, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      let resSeat = await fetchApi.put(`/seatings/${seating._id}`, seating, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resSeat.data.statusCode === 401) {
        onAuthFail();
      } else if (resSeat.data.statusCode === 200) {
        props.setShowModal(false);
        props.setSeatsSelected([]);
        alert("Payment successful. Seats have been successfully booked");
      } else {
        console.log(resSeat.data);
        let res = await fetchApi.delete(`/bookings/${res.data.booking._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        alert("Something went wrong, please try again later");
      }
    } else {
      console.log(res.data);
    }
  }

  async function displayRazorPay() {
    let res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert(
        "The razorpay payment option is currently unavailable. Please try again later"
      );
      return;
    }

    let image =
      document.domain === "localhost"
        ? "http://localhost:3000/favicon.ico"
        : `https://${document.domain}/favicon.ico`;
    var options = {
      key: props.order.key_id,
      amount: props.order.amount,
      currency: props.order.currency,
      name: "myTickets.com",
      description: "Booking a ticket",
      image: image,
      order_id: props.order.id,
      handler: function (response) {
        handleSuccess(response);
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log(response.error);
      alert("Payment has been failed. Please try again");
    });
  }

  return (
    <>
      <div
        className="mx-auto border border-success rounded-lg p-2 my-2"
        style={{ width: "28rem" }}
      >
        <div className="d-flex flex-column pt-2 px-2">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="text-uppercase">{props.show.film.name}</div>
            <div>
              {moment(
                new Date(
                  `${props.show?.date?.slice(0, 10)}T${props.show?.startTime}`
                )
              ).format("DD-MM-YYYY LTS")}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="">
              Seats -{" "}
              {props.seatsSelected?.map((s) => {
                return <span key={s}>{s} </span>;
              })}
              <small className="text-secondary">
                ({props.seatsSelected?.length} Tickets)
              </small>
            </div>
            <div>Rs.{props.price}</div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="">
              <small className="text-secondary">Convenience fees</small>
            </div>
            <div>Rs.{`${props.seatsSelected?.length * 8}`}</div>
          </div>
        </div>
        <hr />
        <div className="px-2">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="">Total Amount</div>
            <div>Rs.{`${props.seatsSelected?.length * 8 + props.price}`}</div>
          </div>
        </div>
      </div>
      <div className="text-center mb-2">
        <button
          className="btn btn-outline-danger"
          onClick={displayRazorPay}
          style={{ width: "28rem" }}
        >
          Pay Rs.{`${props.seatsSelected?.length * 8 + props.price}`}
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
