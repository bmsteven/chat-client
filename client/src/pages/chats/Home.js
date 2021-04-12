import React, { lazy } from "react"

const Layout = lazy(() => import("../../components/chats/Layout"))

const Home = () => {
  return (
    <div className="chat-page">
      <Layout>
        <div
          className="main-content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Welcome to chat section</h1>
        </div>
      </Layout>
    </div>
  )
}

export default Home
