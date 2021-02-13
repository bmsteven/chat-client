import React from "react"

import PageHeader from "../../components/dashboard/PageHeader"

const Error = () => {
  return (
    <div className="dashboard-content home">
      <div className="main-content">
        <PageHeader>Page Not Found</PageHeader>
      </div>
      <div className="dashboard-home">404 error</div>
    </div>
  )
}

export default Error
