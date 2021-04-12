import React, { useLayoutEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useChatsDispatch } from "../../context/chats"
const OnlineUser = ({ user, username }) => {
  const [onlineIndicator, setOnlineIndicator] = useState(0)
  const dispatch = useChatsDispatch()
  const { last_seen } = user
  // console.log(last_seen, new Date().getTime() - 60000)
  useLayoutEffect(() => {
    setOnlineIndicator(
      setInterval(() => {
        // console.log(last_seen, new Date().getTime() - 60000)
        if (last_seen < new Date().getTime() - 60000) {
          dispatch({
            type: "REMOVE_ONLINE_USER",
            payload: user,
          })
        }
      }, 60000)
    )

    return () => clearInterval(onlineIndicator)
  }, [last_seen])
  return (
    <Link
      to={`/chats/${user.username}`}
      key={user.id}
      style={{
        display: "block",
      }}
    >
      {user.username} {username === user.username && "(You)"}
      {/* {last_seen} */}
    </Link>
  )
}

export default OnlineUser
