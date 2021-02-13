import React, { useState } from "react"
import { MdClose } from "react-icons/all"
import axios from "axios"

import ImgUpload from "../imgUpload/ImgUpload"
import "./profileModal.sass"

const ProfileModal = ({ user, closeModal }) => {
  let { name, address, location, tel, dp, dp_img } = user
  let [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    Name: name ? name : "",
    tel: tel ? tel : "",
    location: location ? location : "",
    homeAddress: address ? address : "",
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let body = {
      name: formData.Name,
      tel: formData.tel,
      location: formData.location,
      homeAddress: formData.homeAddress,
    }
    let token = localStorage.getItem("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
    axios
      .post("/profile", body, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        closeModal()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div className="profile-modal">
      <div className="profile-backdrop"></div>
      <div className="container">
        <span onClick={closeModal} className="close">
          <MdClose className="icon" />
        </span>
        <ImgUpload dp_path={dp} dp_img={dp_img} />
        <div className="profile-info">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="Name"
                id="name"
                onChange={(e) => handleChange(e)}
                placeholder="Your Full Name..."
                value={formData.Name}
              />
            </div>
            <div className="input-group">
              <label htmlFor="tel">Tel:</label>
              <input
                type="number"
                name="tel"
                id="tel"
                onChange={(e) => handleChange(e)}
                placeholder="23345464"
                value={formData.tel}
              />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="homeAddress"
                onChange={(e) => handleChange(e)}
                placeholder="Address"
                id="address"
                value={formData.homeAddress}
              />
            </div>
            <div className="input-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                name="location"
                onChange={(e) => handleChange(e)}
                placeholder="Location"
                id="location"
                value={formData.location}
              />
            </div>
            <div className="btns">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
