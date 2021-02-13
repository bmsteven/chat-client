import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import {
  MdSecurity,
  MdMailOutline,
  BiUserCircle,
  BiPhone,
} from "react-icons/all"
import Auth from "./auth"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import setAuthToken from "../../utils/authToken"

const Signup = ({ setMsg }) => {
  let history = useHistory()
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState(null)
  // let [errorMsg, setErrorMsg] = useState(null)
  let [user, setUser] = useContext(UserContext)
  let [formData, setFormData] = useState({
    Name: "",
    email: "",
    tel: "",
    password: "",
  })
  const { Name, email, tel, password } = formData
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErr(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    let User = {
      name: Name,
      email,
      tel,
      password,
    }

    const body = JSON.stringify(User)
    axios
      .post("/register", body, config)
      .then((res) => {
        console.log(res.data)
        if (res.data.token && res.data.results) {
          localStorage.setItem("token", res.data.token)
          setUser({
            ...user,
            isAuthenticated: true,
            data: res.data.results,
          })
          setAuthToken(res.data.token)
          setMsg(res.data.msg)
          history.goBack()
        } else if (res.data.errors) {
          setErr({
            error: "There are errors in your form",
            // name: errors[0].msg,
            // email: errors[1].msg,
            // tel: errors[2].tel
          })
        } else if (res.data.error) {
          setErr({
            error: res.data.error,
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("Internet connection error")
        }
        setLoading(false)
      })
  }
  return (
    <Auth title="Create an account and start ordering food">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">
            <div className="icon-container">
              <BiUserCircle className="icon" />
            </div>
            <div className="input-container">
              <span>Your Full Name:</span>
              <input
                type="text"
                placeholder="example@email.com"
                name="Name"
                id="name"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <div className="icon-container">
              <MdMailOutline className="icon" />
            </div>
            <div className="input-container">
              <span>Your Email Address:</span>
              <input
                type="email"
                placeholder="example@email.com"
                name="email"
                id="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="tel">
            <div className="icon-container">
              <BiPhone className="icon" />
            </div>
            <div className="input-container">
              <span>Your Phone Number:</span>
              <input
                type="text"
                placeholder="2558578585"
                name="tel"
                id="tel"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <div className="icon-container">
              <MdSecurity className="icon" />
            </div>
            <div className="input-container">
              <span>Your Password:</span>
              <input
                type="password"
                placeholder="**********"
                name="password"
                id="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </label>
        </div>
        {err && <div className="alert alert-danger">{err.error}</div>}
        <div className="btns">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Please Wait..." : "SIGNUP"}
          </button>
        </div>
        <div className="btns">
          <Link className="btn btn-secondary" to="/login">
            Already registered? Login
          </Link>
        </div>
      </form>
    </Auth>
  )
}

export default Signup
