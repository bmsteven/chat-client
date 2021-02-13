import React from "react"
import Header from "../header/Header"
import "./banner.sass"

const Banner = ({ children }) => {
  return (
    <div className="banner">
      <div className="before"></div>
      <Header />
      <div className="container content">{children}</div>
    </div>
  )
}

export default Banner
