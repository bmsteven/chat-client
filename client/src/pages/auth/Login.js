import React, { useState, useContext } from "react"
import axios from "axios"
import Auth from "./auth"
import { MdSecurity, MdMailOutline } from "react-icons/all"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import setAuthToken from "../../utils/authToken"

const Login = () => {
  let history = useHistory()
  let [loading, setLoading] = useState(false)
  // let [errorMsg, setErrorMsg] = useState(null)
  let [user, setUser] = useContext(UserContext)
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const saveLocalToken = (token) => {
    if (localStorage.getItem("token") === null) {
      localStorage.setItem("token", "")
    } else {
      localStorage.setItem("cart", token)
    }
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
      email,
      password,
    }

    const body = JSON.stringify(User)
    axios
      .post("/login", body, config)
      .then((res) => {
        // console.log(res)
        if (res.data.msg) console.log(res.data.msg)
        if (res.data.token && res.data.results) {
          saveLocalToken(res.data.token)
          setUser({
            ...user,
            isAuthenticated: true,
            data: res.data.results,
          })
          // setAuthToken(res.data.token)
        }
        setLoading(false)
        history.goBack()
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
    <Auth title="Welcome back, Login to your account">
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <div className="password-rec">
          <a href="#!">Forgot Password?</a>
        </div>
        <div className="btns">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Please Wait..." : "LOGIN"}
          </button>
        </div>
        <div className="btns">
          <Link className="btn btn-secondary" to="/signup">
            Dont have an account? Create new one!
          </Link>
        </div>
      </form>
    </Auth>
  )
}

export default Login
