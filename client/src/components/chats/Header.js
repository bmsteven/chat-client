import React, { lazy } from "react"
import { BiArrowBack } from "react-icons/all"
import "./header.sass"
import defaultDp from "../../assets/images/default-dp.png"

const Search = lazy(() => import("../input/Search"))
const UserNots = lazy(() => import("../user/UserNots"))

const Header = ({ page }) => {
  return (
    <header className="chat-header">
      {page === "home" && (
        <div className="container">
          <div className="logo">
            <h2>Logo</h2>
          </div>
          <div className="search">
            <Search />
          </div>
          <UserNots />
        </div>
      )}
      {page === "user" && (
        <div className="user-container">
          <div className="logo">
            <h2>Logo</h2>
          </div>
          <UserNots />
          <div className="user-info">
            <BiArrowBack className="icon" />
            <div className="dp">
              <img src={defaultDp} alt="dp" />
            </div>
            <div className="user">
              <div className="username">bmsteven</div>
              <div className="active-status">active now</div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
