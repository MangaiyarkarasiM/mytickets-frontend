import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const profileFormValidation = Yup.object().shape({
  name: Yup.string().required("Enter name"),
  lastName: Yup.string(),
  email: Yup.string().email("Enter valid email").required("Enter email"),
  mobile: Yup.string(),
  gender: Yup.string(),
  dob: Yup.date(),
  addressLine1: Yup.string(),
  addressLine2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  pincode: Yup.number(),
});

function ProfileForm(props) {
  const user = props.user;
  //console.log(props.user)
  const onSave = async (value) => {
    props.onEditProfile(value);
    props.setShowModal(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: user?.name ? user.name : "",
          lastName: user?.lastName ? user.lastName : "",
          gender: user?.gender ? user?.gender : "",
          email: user?.email ? user.email : "",
          mobile: user?.mobile ? user.mobile : "",
          addressLine1: user?.addressLine1 ? user.addressLine1 : "",
          addressLine2: user?.addressLine2 ? user.addressLine2 : "",
          city: user?.city ? user.city : "",
          state: user?.state ? user.state : "",
          pincode: user?.pincode > 0 ? user.pincode : "",
          country: user?.country ? user.country : "",
        }}
        onSubmit={onSave}
        validationSchema={profileFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form
              className="d-flex flex-column justify-content-center mx-5"
              id="fooId"
            >
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">Name</label>
                <Field
                  name="name"
                  type="text"
                  value={prop.values.name}
                  className="d-block rounded form-control"
                  placeholder="Name"
                  size="50"
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  value={prop.values.lastName}
                  className="d-block rounded form-control"
                  placeholder="Last name"
                  size="50"
                />
                <ErrorMessage
                  name="lastName"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <div>
                  <label className="d-block font-weight-bold">
                    Gender(Optional)
                  </label>
                </div>
                <div>
                  <Field
                    as="select"
                    name="gender"
                    className="d-block rounded form-control"
                  >
                    <option value="" defaultChecked >Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Field>
                </div>

                <ErrorMessage
                  name="gender"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">Email</label>
                <Field
                  name="email"
                  type="email"
                  value={prop.values.email}
                  className="d-block rounded form-control"
                  placeholder="Email"
                  size="50"
                />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">Mobile</label>
                <Field
                  name="mobile"
                  type="text"
                  value={prop.values.mobile}
                  className="d-block rounded form-control"
                  placeholder="Mobile"
                  size="50"
                />
                <ErrorMessage
                  name="mobile"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">
                  Address Line1
                </label>
                <Field
                  name="addressLine1"
                  type="text"
                  value={prop.values.addressLine1}
                  className="d-block rounded form-control"
                  placeholder="Address"
                  size="50"
                />
                <ErrorMessage
                  name="addressLine1"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">
                  Address Line2
                </label>
                <Field
                  name="addressLine2"
                  type="text"
                  value={prop.values.addressLine2}
                  className="d-block rounded form-control"
                  placeholder="Address"
                  size="50"
                />
                <ErrorMessage
                  name="addressLine2"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">City</label>
                <Field
                  name="city"
                  type="text"
                  value={prop.values.city}
                  className="d-block rounded form-control"
                  placeholder="City"
                  size="50"
                />
                <ErrorMessage
                  name="city"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">State</label>
                <Field
                  name="state"
                  type="text"
                  value={prop.values.state}
                  className="d-block rounded form-control"
                  placeholder="State"
                  size="50"
                />
                <ErrorMessage
                  name="state"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-4 mx-5">
                <label className="d-block font-weight-bold">Pin Code</label>
                <Field
                  name="pincode"
                  type="text"
                  value={prop.values.pincode}
                  maxLength="6"
                  minLength="6"
                  className="d-block rounded form-control"
                  placeholder="Pin Code"
                  size="50"
                />
                <ErrorMessage
                  name="pincode"
                  render={(msg) => (
                    <small className="d-block text-danger">{msg}</small>
                  )}
                />
              </div>
              <hr></hr>
            </Form>
          );
        }}
      </Formik>
      <div className="d-flex justify-content-end align-items-center mr-5">
        <button
          type="button"
          className="btn btn-outline-secondary mr-4"
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          Close
        </button>
        <button
          type="submit"
          className="btn btn-outline-primary"
          form="fooId"
          id="close"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileForm;
