import React from "react"
import { Link } from "react-router-dom"

import PageHeader from "../../../components/dashboard/PageHeader"

const FoodOrders = () => {
  return (
    <div className="dashboard-content foods">
      <div className="main-content">
        <PageHeader>
          <Link to="/dashboard/food">Food /</Link> Orders
        </PageHeader>
        <div className="dashboard-foods new">View Orders</div>
      </div>
    </div>
  )
}

export default FoodOrders
