import React, { useState, useEffect, useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"

import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"

// components
import logo from "../../assets/images/logo.png"
import dp from "../../assets/images/dp.png"

import "./floatHeader.sass"

const FloatHeader = () => {
  let [user, setUser] = useContext(UserContext)
  let [cart, setCart] = useContext(CartContext)
  const [reveal, setReveal] = useState(false)
  const [lastYPos, setLastYPos] = useState(0)

  useEffect(() => {
    // console.log("Mounted")
    const handleScroll = () => {
      const yPos = window.scrollY
      const isScrollingUp = yPos < lastYPos
      // console.log("Listened")
      if (yPos > 100) {
        // setReveal(isScrollingUp)
        setReveal(true)
        // console.log(isScrollingDown, yPos, reveal, "scrolled")
      } else {
        setReveal(false)
      }
      setLastYPos(yPos)
    }

    window.addEventListener("scroll", handleScroll, false)
    return () => {
      window.removeEventListener("scroll", handleScroll, false)
    }
  }, [lastYPos])

  return (
    <div className={reveal ? "revealed float-header" : "float-header"}>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div />
        <nav>
          <ul className="navigation">
            <li>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            {user.isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/favourites">Favourites</NavLink>
                </li>
                <li>
                  <NavLink to="/my-orders">My Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Register</NavLink>
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
          </ul>
        </nav>
        <div className="user-container">
          <Link to="/cart" className="cart">
            {cart && cart.length > 0 && <span>{cart.length}</span>}
            <AiOutlineShoppingCart className="icon" />
          </Link>
          {user && user.data && (
            <div className="dp-container">
              <img src={user.data.dp_path ? user.data.dp_path : dp} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FloatHeader
