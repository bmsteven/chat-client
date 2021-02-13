import React from "react"
import { Link } from "react-router-dom"
import PageHeader from "../../../components/dashboard/PageHeader"

const Team = () => {
  return (
    <div className="dashboard-content team">
      <div className="main-content">
        <PageHeader>
          <Link to="/dashboard/users">Users /</Link> Team
        </PageHeader>
      </div>
      <div className="dashboard-team"></div>
    </div>
  )
}

export default Team
