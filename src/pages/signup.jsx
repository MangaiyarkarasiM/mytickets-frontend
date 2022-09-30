import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import fetchApi from "../utils/fetchApi";
import { GlobalContext } from "../context/globalContext";

const signupFormValidation = Yup.object().shape({
  name: Yup.string().required("Enter name"),
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string().required("Enter password"),
  mobile: Yup.string(),
});

function SignupPage(props) {
  const { spin, setSpin } = useContext(GlobalContext);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSignup = async (value) => {
    let res = await fetchApi.post("/users/register", {
      ...value,
      role: "user",
    });
    if (res.data.statusCode === 200) {
      setSpin(false);
      navigate("/login");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <div className="my-5 mb-3 d-flex flex-column">
      <h3 className="text-dark text-center font-italic">myTickets.com</h3>
      <div
        className="mt-3 logincard shadow"
        style={{ width: "50vw", margin: "auto", padding: "0 0 14px 0" }}
      >
        <Formik
          initialValues={{}}
          onSubmit={(value)=>{
            setSpin(true);
            onSignup(value);
          }
          }
          validationSchema={signupFormValidation}
        >
          {() => {
            return (
              <Form className="d-flex flex-column align-items-center justify-conetent-center px-2">
                <div className="mb-4">
                  <label className="d-block mt-3 font-weight-bold">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="d-block rounded form-control"
                    placeholder="Enter your name"
                    size="50"
                  />
                  <ErrorMessage
                    name="name"
                    render={(msg) => (
                      <small className="d-block text-danger">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="d-block font-weight-bold">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="d-block rounded form-control"
                    placeholder="Enter your email"
                    size="50"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <small className="d-block text-danger">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="d-block font-weight-bold">Mobile</label>
                  <Field
                    name="mobile"
                    type="text"
                    className="d-block rounded form-control"
                    placeholder="Enter your mobile"
                    size="50"
                  />
                  <ErrorMessage
                    name="mobile"
                    render={(msg) => (
                      <small className="d-block text-danger">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <label className="d-block font-weight-bold">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="d-block rounded form-control"
                    placeholder="Password"
                    size="50"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <small className="d-block text-danger">{msg}</small>
                    )}
                  />
                </div>
                {
                  spin ? <button class="btn d-block btn-outline-primary rounded mb-4" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                   {" "}Processing...
                </button> : <button
                  type="submit"
                  className="btn d-block btn-outline-primary rounded mb-4"
                >
                  Sign up
                </button>
                }
              </Form>
            );
          }}
        </Formik>
        {message ? (
          <>
            <div className="d-block text-center text-danger mb-4">
              {message}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <Link className="font-italic" to="/login">
              Login
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
