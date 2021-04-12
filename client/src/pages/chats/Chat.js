import React, { lazy, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const Layout = lazy(() => import("../../components/chats/Layout"))
const SendMessage = lazy(() => import("../../components/input/SendMessage"))
const ChatSection = lazy(() => import("../../components/chats/ChatSection"))

const Chat = () => {
  let { username } = useParams()
  const [openMedia, setOpenMedia] = useState(false)
  let [repliedMessage, setRepliedMessage] = useState()
  useEffect(() => {
    setRepliedMessage()
  }, [username])
  console.log(username)
  return (
    <div>
      <Layout page="chat" username={username}>
        <div className="main-content">
          <ChatSection
            username={username}
            setRepliedMessage={setRepliedMessage}
          />
          <SendMessage
            username={username}
            repliedMessage={repliedMessage}
            setRepliedMessage={setRepliedMessage}
            setOpenMedia={setOpenMedia}
          />
        </div>
      </Layout>
    </div>
  )
}

export default Chat
