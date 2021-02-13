import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import {
  FiLogOut,
  RiDashboardLine,
  RiSettings3Line,
  BiUserCircle,
  FaUsers,
  IoFastFood,
  BsBell,
  // FaFirstOrder,
  GoListOrdered,
} from "react-icons/all"
import { UserContext } from "../../../context/UserContext"

import "./aside.sass"

let routes = [
  {
    path: "",
    name: "Dashboard",
    icon: <RiDashboardLine className="icon" />,
  },
  {
    path: "food",
    name: "Foods",
    icon: <IoFastFood className="icon" />,
  },
  {
    path: "orders",
    name: "Orders",
    icon: <GoListOrdered className="icon" />,
  },
  {
    path: "notifications",
    name: "Notifications",
    notification: true,
    icon: <BsBell className="icon" />,
  },
  {
    path: "users",
    name: "Users",
    icon: <FaUsers className="icon" />,
  },

  {
    path: "profile",
    name: "Profile",
    icon: <BiUserCircle className="icon" />,
  },
  {
    path: "setting",
    name: "Setting",
    icon: <RiSettings3Line className="icon" />,
  },
]

const AsideLeft = ({ asideOpen, setnavOpen, isMobile, notifications }) => {
  const [user, setUser] = useContext(UserContext)

  let number
  if (notifications) {
    let unreadNot = notifications.filter((o) => o.read_status == 0)
    number = unreadNot.length
    if (number > 99) {
      number = "99+"
    }
  }

  const logout = () => {
    setUser({
      isAuthenticated: false,
      data: null,
    })
    localStorage.setItem("token", null)
  }
  return (
    <aside className={`aside-left ${asideOpen}`}>
      <nav>
        <ul className="navigation">
          {routes.map((prop, key) => {
            return (
              <li
                key={key}
                onClick={() => {
                  isMobile && setnavOpen(true)
                }}
              >
                <NavLink
                  to={`/dashboard/${prop.path}`}
                  activeClassName="active"
                >
                  {prop.icon}
                  <span>{prop.name}</span>
                  {/* {prop.notification && number && (
                    // <span className="number">{number}</span>
                  )} */}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <ul className="extra-links">
          <li
            onClick={() => {
              isMobile && setnavOpen(true)
            }}
          >
            <a href="#!" onClick={logout}>
              <FiLogOut className="icon" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default AsideLeft
