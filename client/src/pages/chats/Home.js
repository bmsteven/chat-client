import React, { lazy } from "react"

const Layout = lazy(() => import("../../components/chats/Layout"))

const Home = () => {
  return (
    <div className="chat-page">
      <Layout page="home">Hello world</Layout>
    </div>
  )
}

export default Home
