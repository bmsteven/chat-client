import React from "react"
import { useHistory } from "react-router-dom"
import logo from "../../assets/images/logo.png"

// styles
import "./auth.sass"

const Auth = ({ title, children }) => {
  let history = useHistory()
  return (
    <div className="auth-page">
      <div className="container">
        <div className="back" onClick={history.goBack}>
          &larr; &nbsp; Back
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Auth
