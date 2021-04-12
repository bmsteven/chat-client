import React, { useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import Linkify from "react-linkify"
import moment from "moment"
import "./message.sass"

const Message = ({ message, user, setRepliedMessage, username }) => {
  let {
    id,
    content,
    createdAt,
    read_status,
    received_status,
    senderId,
    recipientId,
    sender,
    parentMsg,
  } = message
  const [open, setOpen] = useState(false)
  createdAt = moment(createdAt).format("HH:mm")

  const addMessage = () => {
    setRepliedMessage(message)
  }

  const toggle = () => {
    setOpen(!open, () => {
      document.addEventListener("click", close)
    })
  }

  const close = () => {
    setOpen(false, () => {
      document.removeEventListener("click", close)
    })
  }

  const deleteMessage = () => {}

  return (
    <>
      <div
        className={user.id === senderId ? "message sent" : "message"}
        id={id}
      >
        <div className="more-options">
          <span onClick={toggle}>
            <BsThreeDotsVertical className="icon" />
          </span>
          <div className={open ? "more open" : "more"}>
            <span onClick={addMessage}>Reply</span>
            {user.id === senderId && (
              <span onClick={deleteMessage}>Delete Message</span>
            )}
          </div>
        </div>
        <div>
          {parentMsg && (
            <div className="parent-msg">
              <a href={`#${parentMsg.id}`}>
                <div className="sender">
                  {user.id === parentMsg.senderId ? "You:" : `${username}:`}
                </div>
                <p>{parentMsg.content}</p>
              </a>
            </div>
          )}
          <div className="msg-content">
            <p>
              <Linkify>{content}</Linkify>
            </p>
            <div className="created-at">
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Message
