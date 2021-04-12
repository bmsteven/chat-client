import React, { lazy, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { useChatsState } from "../../context/chats"
import { GET_MESSAGES } from "../../graphql/queries"
import { useChatsDispatch } from "../../context/chats"
import { useAuthState } from "../../context/auth"
import generatedItems from "./generatedItems"
const Message = lazy(() => import("./Message"))
const Date = lazy(() => import("./Date"))

const ChatSection = ({ username, setRepliedMessage }) => {
  const { chats } = useChatsState()
  let chat = chats.filter((el) => el.username === username)
  let messages = chat[0]?.messages
  let messagesList, days
  if (messages) messagesList = generatedItems(messages)
  if (messagesList) days = messagesList.filter((e) => e.type === "day")
  const { user } = useAuthState()
  const dispatch = useChatsDispatch()
  const [loadMessages, { loading }] = useLazyQuery(GET_MESSAGES, {
    onCompleted(res) {
      dispatch({
        type: "LOAD_MESSAGES",
        payload: res.getMessages,
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    if (messages == null) {
      loadMessages({ variables: { username } })
    }
  }, [username])

  // console.log(chats)

  return (
    <div className="chat-section">
      <div className="messages">
        {messagesList?.length > 0 &&
          messagesList.map((message) => (
            <div
              key={message.id}
              className={message.type != "day" ? "message-box" : ""}
              style={{
                justifySelf:
                  message.type != "day" &&
                  user.id === message.senderId &&
                  "flex-end",
                alignSelf:
                  message.type !== "day"
                    ? user.id === message.senderId
                      ? "flex-end"
                      : "flex-start"
                    : "",
                right:
                  message.type != "day" && user.id === message.senderId && "0",
              }}
            >
              {message.type === "day" ? (
                <Date message={message} days={days} />
              ) : (
                <Message
                  message={message}
                  user={user}
                  setRepliedMessage={setRepliedMessage}
                  username={username}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default ChatSection
