import React, { lazy } from "react"
import { BiArrowBack } from "react-icons/all"
import "./header.sass"
import defaultDp from "../../assets/images/default-dp.png"

const Search = lazy(() => import("../input/Search"))
const UserNots = lazy(() => import("../user/UserNots"))
const UserHeader = lazy(() => import("../user/UserHeader"))

const Header = ({ page, username }) => {
  return (
    <header className="chat-header">
      <div className="chat-section">
        {page === "chat" ? (
          <div className="user-container">
            <div className="container">
              <div className="logo">
                <h3>Logo</h3>
              </div>
              <UserNots />
            </div>
            <div className="user-info">
              <BiArrowBack className="icon" />
              <div className="dp">
                <img src={defaultDp} alt="dp" />
              </div>
              <div className="user">
                <div className="username">{username}</div>
                <div className="status">active now</div>
              </div>
            </div>
          </div>
        ) : (
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
      </div>
      <UserHeader />
    </header>
  )
}

export default Header
