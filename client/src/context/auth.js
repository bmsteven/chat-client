import React, { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token, { expires: 365 })
      console.log(payload)
      return {
        ...state,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "REGISTER":
      Cookies.set("token", payload.token, { expires: 365 })
      console.log(payload)
      return {
        ...state,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "VERIFY_ACCOUNT":
      Cookies.set("token", payload.token, { expires: 365 })
      return {
        ...state,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "LOGOUT":
      Cookies.remove("token")
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case "AUTH":
      return {
        ...state,
        user: payload,
        isAuthenticated: payload.verified === true ? true : false,
      }
    default:
      return {
        state,
      }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  })
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
