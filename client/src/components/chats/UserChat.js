import React from "react"
import { Link } from "react-router-dom"

const UserChat = ({ user }) => {
  const { username, id } = user
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
          state: { id: id },
        }}
      >
        {username}
      </Link>
    </li>
  )
}

export default UserChat
