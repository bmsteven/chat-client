import React, { lazy } from "react"

const Layout = lazy(() => import("../../components/chats/Layout"))

const Home = () => {
  return (
    <div className="chat-page">
      <Layout>
        <div className="main-content"></div>
        <div className="aside-contents"></div>
      </Layout>
    </div>
  )
}

export default Home
