import React from "react"
import { Link } from "react-router-dom"
import { BiBell, BiChat } from "react-icons/all"

const UserNots = () => {
  return (
    <div className="user-nots">
      <Link to="/notifications" className="notifications">
        <BiBell className="icon" />
        {/* <span>25</span> */}
      </Link>
      <Link to="/chats" className="chats">
        <BiChat className="icon" />
        {/* <span>1</span> */}
      </Link>
    </div>
  )
}

export default UserNots
