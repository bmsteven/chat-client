import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { RiAppsLine, FaGooglePlay, FaAppStore } from "react-icons/all"
import { UserContext } from "../../context/UserContext"

import logo from "../../assets/images/logo-w.png"
import "./footer.sass"

const Footer = () => {
  let [user, setUser] = useContext(UserContext)
  return (
    <footer>
      <div className="links">
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/food-uber-app">Food Uber App</Link>
            </li>
          </ul>
        </div>
        <div className="footer-auth">
          <h4>User</h4>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {user.isAuthenticated ? (
              <>
                <li>
                  <Link to="/favourites">My Favourites</Link>
                </li>
                <li>
                  <Link to="/my-orders">My Orders</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/setting">Setting</Link>
                </li>
                {user &&
                user.data &&
                (user.data.role === "admin" ||
                  user.data.role === "main-admin") ? (
                  <>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="footer">
          &copy; - kodemunit, designed and developed by{" "}
          <a href="http://bm-dev.netlify.app">Benedict Steven</a>
        </div>
      </div>
      <div className="social-media">
        <h4>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </h4>
        <div className="app-download">
          <h5>Download Our App From</h5>
          <div className="btns">
            <a href="#" className="btn btn-primary">
              <FaGooglePlay className="icon" />
              Playstore
            </a>
            <a href="#" className="btn btn-primary">
              <FaAppStore className="icon" />
              AppStore
            </a>
          </div>
        </div>
        <div className="social">
          <ul>
            <li>
              <a href="http://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="http://twitter.com">Twitter</a>
            </li>
            <li>
              <a href="http://instagram.com">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
