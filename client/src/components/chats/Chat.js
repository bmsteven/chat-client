import React from "react"
import { NavLink } from "react-router-dom"
import defaultDp from "../../assets/images/default-dp.png"
import moment from "moment"
import "./chat.sass"

const Chat = ({ chat, user }) => {
  const { username, dp, latestMessage, id } = chat
  let today, created, createdAt
  if (latestMessage) {
    today = new Date()

    created = new Date(latestMessage.createdAt)

    let yesterday = new Date(Date.now()).setHours(0, 0, 0, 0) - 864e5

    if (today.setHours(0, 0, 0, 0) == created.setHours(0, 0, 0, 0)) {
      createdAt = moment(latestMessage.createdAt).format("HH:mm")
    } else if (created.setHours(0, 0, 0, 0) == yesterday) {
      createdAt =
        "Yesterday," + " " + moment(latestMessage.createdAt).format("HH:mm")
    } else {
      createdAt = moment(latestMessage.createdAt).format("MMM DD, YYYY HH:mm")
    }
  }

  return (
    <>
      {latestMessage != null && (
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
              <div className="created-at">{createdAt}</div>
            </div>
            <div className="message-content">
              <p>
                {latestMessage.senderId === user.id && "You: "}
                {latestMessage.content}
              </p>
              {/* <span>2</span> */}
            </div>
          </div>
        </NavLink>
      )}
    </>
  )
}

export default Chat
