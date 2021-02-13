import React from "react"

import PageHeader from "../../components/dashboard/PageHeader"

const Home = () => {
  return (
    <div className="dashboard-content home">
      <div className="main-content">
        <PageHeader />
      </div>
      <div className="dashboard-home">Home dashboard</div>
    </div>
  )
}

export default Home
