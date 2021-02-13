import React from "react"
import { Link } from "react-router-dom"

// components
import PageHeader from "../../../components/dashboard/PageHeader"
import FoodForm from "../../../components/dashboard/foodForm/FoodForm"

const NewFood = () => {
  return (
    <div className="dashboard-content foods">
      <div className="main-content">
        <PageHeader>
          <Link to="/dashboard/food">Food /</Link> New
        </PageHeader>
        <div className="dashboard-foods new">
          <FoodForm />
        </div>
      </div>
    </div>
  )
}

export default NewFood
