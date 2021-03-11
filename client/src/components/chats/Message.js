import React from "react"
import moment from "moment"

const Message = ({ message, user }) => {
  let {
    senderId,
    recipientId,
    content,
    createdAt,
    read_status,
    received_status,
  } = message
  const { id } = user
  return (
    <div
      className={id === senderId ? "sent" : "received"}
      style={{
        width: "70%",
        maxWidth: "70%",
        margin: "1em",
        position: "relative",
        justifySelf: id === senderId && "flex-end",
        alignSelf: id === senderId && "flex-end",
        right: id === senderId && "0%",
        textAlign: id === senderId ? "right" : "left",
        background: id === senderId ? "white" : "#F2D8FF",
        padding: "10px",
        borderRadius: "10px",
        color: "#282247",
      }}
    >
      <p>{content}</p>
      <p
        style={{
          color: "#626262",
          fontSize: "12px",
          textAlign: "right",
          marginTop: "7px",
        }}
      >
        <span>{moment(createdAt).format("MMM DD, YYYY h:mm a")}</span>
      </p>
    </div>
  )
}

export default Message
