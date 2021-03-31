import React from "react"
import { NavLink } from "react-router-dom"
import defaultDp from "../../assets/images/default-dp.png"
import "./chat.sass"

const Chat = ({ chat }) => {
  const { username, dp, latestMessage, id } = chat
  return (
    <>
      {/* {latestMessage != null &&  */}
      <NavLink
        to={`/chats/${username}`}
        activeClassName="active"
        className="chat"
      >
        <div className="dp-container">
          {dp ? <img src={dp} alt="dp" /> : <img src={defaultDp} alt="dp" />}
        </div>
        <div className="message">
          <div className="message-info">
            <div className="username">{username}</div>
            <div className="created-at">11:30</div>
          </div>
          <div className="message-content">
            <p>
              Latest Message sent by you guys and its a good message actually
            </p>
            {/* <span>2</span> */}
          </div>
        </div>
      </NavLink>

      {/* } */}
    </>
  )
}

export default Chat
