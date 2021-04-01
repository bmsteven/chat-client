import React from "react"
import Linkify from "react-linkify"
import moment from "moment"

const Message = ({ message, user }) => {
  let {
    id,
    content,
    createdAt,
    read_status,
    received_status,
    senderId,
    recipientId,
  } = message

  let today = new Date()

  let created = new Date(createdAt)

  if (today.setHours(0, 0, 0, 0) == created.setHours(0, 0, 0, 0)) {
    createdAt = moment(createdAt).format("HH:mm")
  } else {
    createdAt = moment(createdAt).format("MMM DD, YYYY HH:mm a")
  }
  return (
    <div className={user.id === senderId ? "message sent" : "message"}>
      <div>
        <div className="parent-msg"></div>
        <div className="msg-content">
          <p>
            <Linkify>{content}</Linkify>
          </p>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  )
}

export default Message
