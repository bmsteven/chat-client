import React, { lazy } from "react"

const Header = lazy(() => import("./Header"))

const Layout = ({ page, children }) => {
  return (
    <div className="chat-layout">
      <Header page={page} />
    </div>
  )
}

export default Layout
