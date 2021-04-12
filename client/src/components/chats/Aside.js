import React, { useEffect, useState } from "react"
import { FiSettings } from "react-icons/all"
import { useChatsState } from "../../context/chats"
import Chat from "../chats/Chat"
import Search from "./Search"
import "./aside.sass"

const Aside = ({ user }) => {
  let { chats, results } = useChatsState()
  let [sortedChats, setSortedChats] = useState([])

  useEffect(() => {
    setSortedChats(
      chats
        .slice()
        .sort((a, b) =>
          Number(
            new Date(b.latestMessage.createdAt) -
              new Date(a.latestMessage.createdAt)
          )
        )
    )
  }, [chats])

  return (
    <aside className="chat-aside">
      <header className="chat-aside-header">
        <div className="container">
          <h2>Chats</h2>
          <FiSettings className="icon" />
        </div>
      </header>
      <nav className="chat-aside-nav">
        <ul>
          <li className="active">All</li>
          <li>Direct</li>
          <li>Your Rooms</li>
          <li>Your Network</li>
        </ul>
      </nav>
      <Search />
      <div className="chats">
        {results.length > 0 ? (
          <>Hello</>
        ) : (
          <>
            {sortedChats.length > 0 ? (
              <>
                {sortedChats.map((chat) => {
                  if (chat != null) {
                    return <Chat chat={chat} key={chat.id} user={user} />
                  }
                })}
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

export default Aside
