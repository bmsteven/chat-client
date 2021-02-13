import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/all"
import "./header.sass"
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"
// import axios from "axios"

// components
// import HeaderSvg from "./HeaderSvg"

// logo
import logo from "../../assets/images/logo.png"

const Header = () => {
  const [user, setUser] = useContext(UserContext)
  const [cart, setCart] = useContext(CartContext)
  return (
    <header className="nav-header">
      <div className="svg-container">{/* <HeaderSvg /> */}</div>
      <div className="container header-container">
        <nav className="navigation">
          <ul>
            <li>
              <NavLink to="/menu" activeClassName="active">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <nav className="auth">
          <ul>
            {user.isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/my-orders" activeClassName="active">
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Favourites" activeClassName="active">
                    Favourites
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" activeClassName="active">
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/signup">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login" activeClassName="active">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {user &&
            user.data &&
            (user.data.role === "admin" || user.data.role === "main-admin") ? (
              <>
                <li>
                  <NavLink to="/dashboard" activeClassName="active">
                    Dashboard
                  </NavLink>
                </li>
              </>
            ) : null}
            <li>
              <NavLink to="/cart" className="cart">
                {cart && cart.length > 0 && <span>{cart.length}</span>}
                <AiOutlineShoppingCart className="icon" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
