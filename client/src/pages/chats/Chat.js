import React, { lazy, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { useAuthState } from "../../context/auth"
import { GET_MESSAGES } from "../../graphql/queries"
const Layout = lazy(() => import("../../components/chats/Layout"))
const SendMessage = lazy(() => import("../../components/input/SendMessage"))
const Message = lazy(() => import("../../components/chats/Message"))

const Chat = () => {
  let { username } = useParams()
  const { user } = useAuthState()
  let [messages, setMessages] = useState([])
  const [loadMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
    onCompleted(res) {
      setMessages(res.getMessages)
    },
    onError(err) {
      console.log(err)
    },
  })
  useEffect(() => {
    loadMessages({ variables: { username } })
  }, [messages, username])
  return (
    <div>
      <Layout page="chat" username={username}>
        <div className="main-content">
          <div className="chat-section">
            {messages.length > 0 &&
              messages.map((message) => (
                <Message message={message} key={message.id} user={user} />
              ))}
          </div>
          <SendMessage username={username} />
        </div>
        <div className="aside-contents"></div>
      </Layout>
    </div>
  )
}

export default Chat
