import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../context/globalContext";

const loginFormValidation = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string().required("Enter password"),
});

function LoginPage() {
  const { onLogin, message, spin, setSpin } = useContext(GlobalContext);

  return (
    <div className="my-5 d-flex flex-column">
      <h3 className="text-dark text-center font-italic">myTickets.com</h3>
      <div
        className="mt-4 logincard shadow"
        style={{ width: "50vw", margin: "auto", padding: "0 0 14px 0" }}
      >
        <Formik
          initialValues={{}}
          onSubmit={(value)=>{
            setSpin(true);
            onLogin(value);
          }}
          validationSchema={loginFormValidation}
          className="d-inline-block mt-2"
        >
          {() => {
            return (
              <Form className="d-flex flex-column align-items-center justify-conetent-center border-info rounded px-2">
                <div className="mb-4">
                  <label className="d-block mt-3 font-weight-bold">Email</label>
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
                  Login
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
            New user?{" "}
            <Link className="font-italic" to="/signup">
              Sign up
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
