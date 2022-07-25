import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import {GlobalContext} from '../../context/globalContext';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../context/globalContext";

const loginFormValidation = Yup.object().shape({
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string().required("Enter password"),
});

function LoginPage(props) {
  const {onLogin,message} = useContext(GlobalContext);

  return (
    <div className="my-5 d-flex flex-column">
      <h3 className="text-info text-center">Book Your Show</h3>
      <div
        className="mt-4 logincard shadow"
        style={{ width: "50vw", margin: "auto", padding: "0 0 14px 0" }}
      >
        <Formik
          initialValues={{}}
          onSubmit={onLogin}
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

                <button
                  type="submit"
                  className="btn d-block bg-info rounded mb-4"
                >
                  Login
                </button>
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