import React, { lazy } from "react"
import { BsArrowRight, FaAngleDown, MdArrowDropDown } from "react-icons/all"
import { useAuthState } from "../../context/auth"
import "./userHeader.sass"
import defaultDp from "../../assets/images/default-dp.png"
const UserDropDown = lazy(() => import("./UserDropDown"))

const UserHeader = () => {
  const { user } = useAuthState()
  return (
    <div className="auth-header">
      <div className="icon-container">
        <BsArrowRight className="icon" />
      </div>
      <div className="user-details">
        <div className="dp-container">
          {user?.dp ? (
            <img src={user.dp} alt="dp" />
          ) : (
            <img src={defaultDp} alt="dp" />
          )}
        </div>
        <div className="username">{user?.username}</div>
        <div className="icon-container dropdown-icon">
          <MdArrowDropDown className="icon" />
        </div>
        <div className="dropdown">
          <UserDropDown />
        </div>
      </div>
    </div>
  )
}

export default UserHeader
