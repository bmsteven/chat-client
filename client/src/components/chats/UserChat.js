import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const UserChat = ({ user }) => {
  const { username, id, dp, status, latestMessage } = user
  console.log(latestMessage)
  return (
    <li
      key={id}
      style={{
        width: "200px",
        maxWidth: "80%",
        listStyle: "none",
        border: "1px solid grey",
        margin: "1em 0",
        padding: ".5em",
      }}
    >
      <Link
        to={{
          pathname: `/chats/${username}`,
          state: { id, dp, status, username },
        }}
      >
        {username}
        <p>
          {latestMessage && latestMessage.content ? (
            <>{latestMessage.content}</>
          ) : (
            <>You are now connected</>
          )}
        </p>
        <span>
          {latestMessage &&
            moment(latestMessage.createdAt).format("MMM DD YYYY h:mm a")}
        </span>
      </Link>
    </li>
  )
}

export default UserChat
