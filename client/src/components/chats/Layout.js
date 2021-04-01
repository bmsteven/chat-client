import React, { lazy } from "react"
import "./layout.sass"
const Header = lazy(() => import("./Header"))

const Layout = ({ page, username, children }) => {
  return (
    <div className="chat-layout">
      <Header page={page} username={username} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
