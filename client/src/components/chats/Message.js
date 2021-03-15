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
  let today = new Date()

  let created = new Date(createdAt)

  if (today.setHours(0, 0, 0, 0) == created.setHours(0, 0, 0, 0)) {
    createdAt = moment(createdAt).format("HH:mm")
  } else {
    createdAt = moment(createdAt).format("MMM DD, YYYY HH:mm a")
  }

  return (
    <div
      style={{
        width: "auto",
        maxWidth: "70%",
        margin: "1em",
        position: "relative",
        display: "inline-block",
        justifySelf: id === senderId && "flex-end",
        alignSelf: id === senderId ? "flex-end" : "flex-start",
        right: id === senderId && "0%",
      }}
    >
      <div
        className={id === senderId ? "sent" : "received"}
        style={{
          // textAlign: id === senderId ? "right" : "left",
          background: id === senderId ? "white" : "#F2D8FF",
          padding: "10px",
          borderRadius: "10px",
          color: "#282247",
          whiteSpace: "pre-line",
        }}
      >
        <p>{content}</p>
        <p
          style={{
            color: "#626262",
            fontSize: "12px",
            textAlign: "right",
            marginTop: "7px",
            width: "100%",
          }}
        >
          <span>{createdAt}</span>
        </p>
      </div>
      {senderId === id && (
        <p
          style={{
            color: "#626262",
            fontSize: "10px",
            textAlign: "right",
          }}
        >
          {received_status === false ? (
            <>
              <span
                style={{
                  border: "1px solid #626262",
                  borderRadius: "50%",
                  height: "12px",
                  width: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                  background: read_status === false ? "black" : "",
                  color: read_status === false ? "white" : "",
                }}
              >
                &#10003;
              </span>
              <span
                style={{
                  border: "1px solid #626262",
                  borderRadius: "50%",
                  height: "12px",
                  width: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                  background: read_status === false ? "black" : "",
                  color: read_status === false ? "white" : "",
                }}
              >
                &#10003;
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  border: "1px solid #626262",
                  borderRadius: "50%",
                  height: "15px",
                  width: "15px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "inline-flex",
                  background: read_status === false ? "black" : "",
                  color: read_status === false ? "white" : "",
                }}
              >
                &#10003;
              </span>
            </>
          )}
        </p>
      )}
    </div>
  )
}

export default Message
