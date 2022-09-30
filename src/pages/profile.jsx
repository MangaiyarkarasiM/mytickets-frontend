import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import ProfileForm from "../components/Profile/ProfileForm";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from "../context/globalContext";

function ProfilePage(props) {
  const { onAuthFail } = useContext(GlobalContext);
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  async function getUserById() {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      setUser(res.data.user);
      //setMessage(res.data.message);
    } else {
      console.log(res.data);
    }
  }

  useEffect(() => {
    getUserById();
  }, [id]);

  const onEditProfile = async (value) => {
    let token = sessionStorage.getItem("token");
    let res = await fetchApi.put(`/users/${id}`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getUserById();
    } else {
      console.log(res.data);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow profile-card px-5 pt-4 pb-3">
              <div className="mb-3">
                <div className="d-flex flex-direction-column justify-content-between">
                  <h5>Personal details</h5>
                  <button
                    className="close"
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">First Name </div>
                <div className="ml-5">{user.name?.toUpperCase()}</div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Last Name </div>
                <div className="ml-5">{user.lastName?.toUpperCase()}</div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Gender (Optional) </div>
                <div className="ml-5">{user.gender}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow profile-card px-5 pt-4 pb-3">
              <div className="mb-3">
                <h5>Account details</h5>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Email </div>
                <div className="ml-5">{user.email}</div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Mobile</div>
                <div className="ml-5">{user.mobile}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow profile-card px-5 pt-4 pb-3">
              <div className="mb-3">
                <h5>Address</h5>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Address Line 1 </div>
                <div className="ml-5">
                  {user.addressLine1 ? user.addressLine1?.toUpperCase() : ""}
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Address Line 2 </div>
                <div className="ml-5">
                  {user.addressLine2 ? user.addressLine2?.toUpperCase() : ""}
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">City </div>
                <div className="ml-5">
                  {user.city ? user.city?.toUpperCase() : ""}
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">State </div>
                <div className="ml-5">
                  {user.state ? user.state?.toUpperCase() : ""}
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="w-25">Pincode </div>
                <div className="ml-5">
                  {user.pincode > 0 ? user.pincode : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        title="Edit Profile"
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ProfileForm
          user={user}
          setShowModal={setShowModal}
          onEditProfile={onEditProfile}
        ></ProfileForm>
      </Modal>
    </>
  );
}

export default ProfilePage;
