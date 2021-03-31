import React from "react"
import { FiSettings } from "react-icons/all"
import { useChatsState } from "../../context/chats"
import Chat from "../chats/Chat"
import Search from "./Search"
import "./aside.sass"

const Aside = () => {
  const { chats, results } = useChatsState()
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
            {chats.length > 0 ? (
              <>
                {chats.map((chat) => (
                  <Chat chat={chat} key={chat.id} />
                ))}
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
