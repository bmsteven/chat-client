import React, { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  state = {
    user: null,
    userLoading: true,
  }
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token, { expires: 365 })
      console.log(payload)
      return {
        ...state,
        userLoading: false,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "REGISTER":
      Cookies.set("token", payload.token, { expires: 365 })
      console.log(payload)
      return {
        ...state,
        userLoading: false,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "VERIFY_ACCOUNT":
      Cookies.set("token", payload.token, { expires: 365 })
      return {
        ...state,
        userLoading: false,
        isAuthenticated: payload.verified === true ? true : false,
      }
    case "LOGOUT":
      Cookies.remove("token")
      return {
        ...state,
        user: null,
        userLoading: false,
        isAuthenticated: false,
      }
    case "AUTH":
      return {
        ...state,
        userLoading: false,
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
