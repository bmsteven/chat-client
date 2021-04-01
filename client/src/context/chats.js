import React, { createContext, useReducer, useContext } from "react"

const ChatsStateContext = createContext()
const ChatsDispatchContext = createContext()

const chatsReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "LOAD_CHATS":
      return {
        ...state,
        chats: payload,
      }
    case "SELECT_USER":
      return {
        ...state,
      }
    case "LOAD_MESSAGES":
      return {
        ...state,
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
