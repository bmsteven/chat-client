import React, { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"

const ChatsStateContext = createContext()
const ChatsDispatchContext = createContext()

let user = {}
let token = Cookies.get("token")

if (token) user = jwtDecode(token)

const chatsReducer = (state, action) => {
  let chatsCopy, chatIndex, usersCopy, data, userIndex
  let { type, payload } = action
  switch (type) {
    case "LOAD_CHATS":
      return {
        ...state,
        chats: payload,
      }
    case "NEW_MESSAGE":
      const {
        id,
        content,
        media,
        media_type,
        createdAt,
        senderId,
        recipientId,
        sender,
        chatId,
        recipient,
        parentMsg,
      } = payload.newMessage
      let message = {
        id,
        content,
        createdAt,
        media,
        media_type,
        senderId,
        recipientId,
        sender,
        recipient,
        chatId,
        parentMsg,
      }
      chatsCopy = [...state.chats]
      chatIndex = chatsCopy.findIndex((u) => u.latestMessage.chatId === chatId)
      if (chatIndex >= 0) {
        chatsCopy[chatIndex] = {
          ...chatsCopy[chatIndex],
          latestMessage: message,
          messages: chatsCopy[chatIndex].messages
            ? [message, ...chatsCopy[chatIndex].messages]
            : [message],
        }
      } else {
        chatsCopy = chatsCopy.concat({
          id,
          username:
            user?.id === senderId ? recipient.username : sender.username,
          dp: user.id === senderId ? recipient.dp : sender.dp,
          latestMessage: message,
          messages: [message],
        })
      }

      return {
        ...state,
        chats: chatsCopy,
      }
    case "LOAD_MESSAGES":
      let messages = payload
      chatsCopy = [...state.chats]
      chatIndex = chatsCopy.findIndex(
        (u) => u?.latestMessage?.chatId === messages[0]?.chatId
      )
      if (chatIndex >= 0) {
        chatsCopy[chatIndex] = {
          ...chatsCopy[chatIndex],
          messages,
        }
      }
      return {
        ...state,
        chats: chatsCopy,
      }
    case "LOAD_ONLINE_USER":
      data = payload.userLastSeen
      usersCopy = [...state.users]
      userIndex = usersCopy.findIndex((u) => u.id === data.id)
      if (userIndex < 0) {
        usersCopy = usersCopy.concat(data)
      } else {
        usersCopy[userIndex] = {
          ...usersCopy[userIndex],
          last_seen: data.last_seen,
        }
      }
      return {
        ...state,
        users: usersCopy,
      }

    case "REMOVE_ONLINE_USER":
      data = payload
      console.log(data)
      usersCopy = [...state.users]
      userIndex = usersCopy.findIndex((u) => u.id === data.id)
      if (userIndex > -1) {
        console.log("remove")
        usersCopy = usersCopy.splice(userIndex, 1)
      }
      return {
        ...state,
        users: usersCopy,
      }
    default:
      return {
        state,
      }
  }
}

export const ChatsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, {
    chats: [],
    results: [],
    rooms: [],
    networks: [],
    users: [],
  })
  return (
    <ChatsDispatchContext.Provider value={dispatch}>
      <ChatsStateContext.Provider value={state}>
        {children}
      </ChatsStateContext.Provider>
    </ChatsDispatchContext.Provider>
  )
}

export const useChatsState = () => useContext(ChatsStateContext)
export const useChatsDispatch = () => useContext(ChatsDispatchContext)
