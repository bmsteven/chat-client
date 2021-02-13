import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaAngleDown, BsBell } from "react-icons/all"
import { UserContext } from "../../../context/UserContext"

import dp_img from "../../../assets/images/dp.png"
import logo from "../../../assets/images/logo.png"

import "./header.sass"

const Header = ({ navOpen, handleNav, notifications, setNotifications }) => {
  const [user, setUser] = useContext(UserContext)
  const [open, setOpen] = useState(false)
  let Name
  let number
  if (notifications) {
    let unreadNot = notifications.filter((o) => o.read_status == 0)
    number = unreadNot.length
    if (number > 99) {
      number = "99+"
    }
  }
  if (user && user.data) {
    Name = user.data.name.split(" ")[0]
  }
  const logout = () => {
    setUser({
      ...user,
      isAuthenticated: false,
      data: null,
    })
    localStorage.setItem("token", null)
  }
  let token = localStorage.getItem("token")
  useEffect(() => {
    let config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .get("/notifications", config)
      .then((res) => {
        // console.log(res.data)
        if (res.data.results) {
          setNotifications(res.data.results)
          // console.log(notifications)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setNotifications, notifications])

  return (
    <header
      className={navOpen ? "dashboard-header" : "dashboard-header full-width"}
    >
      <div className="container">
        <div className="burger-logo-container">
          <div
            className={navOpen ? "burger" : "burger burger-shift-right"}
            onClick={handleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Kodemunit logo" className="logo" />
            </Link>
          </div>
        </div>
        <nav>
          <span className="role nav-link">
            <Link to="/dashboard/notifications" className="alerts">
              <BsBell className="icon" />
              {number && <span>{number}</span>}
            </Link>
          </span>{" "}
          &nbsp;
          <a
            href="#!"
            className="user-name nav-link"
            // onTap={() => setOpen(!open)}
          >
            <span className="nav-link">{Name}</span>
            <FaAngleDown className="icon" />
          </a>
          <ul className={open ? "dropdown show" : "dropdown"}>
            <li>
              <a href="#!" onClick={() => setOpen(false)}>
                Name
              </a>
            </li>
            <li>
              <span>{user.role}</span>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a
                href="#!"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                Logout
              </a>
            </li>
          </ul>
          <div className="profile-image">
            {user && user.data && (
              <img
                src={user.data.dp_path ? user.data.dp_path : dp_img}
                alt="profile/dp"
                loading="lazy"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
