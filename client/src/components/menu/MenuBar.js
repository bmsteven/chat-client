import React, { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import {
  IoHomeOutline,
  AiOutlineShoppingCart,
  CgProfile,
  FiMoreHorizontal,
  AiOutlineOrderedList,
  AiOutlineStar,
  // AiFillStar,
  FiLogOut,
  BsInfoSquare,
  RiSettings3Line,
  RiDashboardLine,
  MdHelpOutline,
  AiOutlinePhone,
} from "react-icons/all"

import { UserContext } from "../../context/UserContext"

import "./menu.sass"

const MenuBar = () => {
  let [user, setUser] = useContext(UserContext)
  const [reveal, setReveal] = useState(false)
  const [lastYPos, setLastYPos] = useState(0)
  const [dropOpen, setDropOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // console.log("Mounted")
    const handleScroll = () => {
      const yPos = window.scrollY
      const isScrollingDown = yPos > lastYPos
      // console.log("Listened")
      if (yPos > 50) {
        setReveal(true)
        // console.log(isScrollingDown, yPos, reveal, "scrolled")
      } else {
        setReveal(false)
        setDropOpen(false)
        // console.log(isScrollingDown, yPos, reveal, "nope")
      }
      setLastYPos(yPos)
    }

    window.addEventListener("scroll", handleScroll, false)
    return () => {
      window.removeEventListener("scroll", handleScroll, false)
    }
  }, [lastYPos])

  const logout = () => {
    setUser({
      isAuthenticated: false,
      data: null,
    })
    localStorage.setItem("token", null)
  }

  return (
    <div className={reveal ? "revealed menu-bar" : "menu-bar"}>
      <div
        className={menuOpen ? "burger open" : "burger"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
      </div>
      <div className={menuOpen ? "nav-container menu-open" : "nav-container"}>
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                <IoHomeOutline className="icon" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" activeClassName="active">
                <AiOutlineShoppingCart className="icon" />
                <span>Cart</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                <CgProfile className="icon" />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <span
                className="more"
                onClick={() => {
                  setDropOpen(true)
                }}
              >
                <FiMoreHorizontal className="icon" />
                <span>More</span>
              </span>
            </li>
          </ul>
          <div className={dropOpen ? "open drop-up-menu" : "drop-up-menu"}>
            <div
              className="menu-backdrop"
              onClick={() => {
                setDropOpen(false)
              }}
            ></div>
            <div className="navigation">
              <div className="nav-header">More</div>
              <nav>
                <ul>
                  <li>
                    <NavLink to="/">
                      <AiOutlineOrderedList className="icon" />
                      <span>My Orders</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/">
                      <AiOutlineStar className="icon" />
                      <span>Favourites</span>
                    </NavLink>
                  </li>
                  {user &&
                    user.data &&
                    (user.data.role === "admin" ||
                      user.data.role === "main-admin") && (
                      <li>
                        <NavLink to="/dashboard">
                          <RiDashboardLine className="icon" />
                          <span>Dashboard</span>
                        </NavLink>
                      </li>
                    )}

                  <li>
                    <NavLink to="/">
                      <RiSettings3Line className="icon" />
                      <span>Setting</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/faq">
                      <MdHelpOutline className="icon" />
                      <span>Help</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">
                      <BsInfoSquare className="icon" />
                      <span>About Us</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">
                      <AiOutlinePhone className="icon" />
                      <span>Contact Us</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#!" onClick={logout}>
                      <FiLogOut className="icon" />
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MenuBar
