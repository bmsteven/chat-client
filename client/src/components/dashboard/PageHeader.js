import React from "react"
import { Link } from "react-router-dom"
import Time from "./Time"

const PageHeader = ({ children }) => {
  return (
    <header>
      <div className="container">
        <span>
          <Link to="/dashboard">Dashboard /</Link> {children}
        </span>
        <Time />
      </div>
    </header>
  )
}

export default PageHeader
