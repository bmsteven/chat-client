import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const FoodCard = ({ name, id, description, food_image, cost, plates }) => {
  let [loading, setLoading] = useState(false)
  let token = localStorage.getItem("token")
  const remove = (id, name) => {
    window.confirm(`Are you sure you want to delete ${name}`)
    console.log(token)
    if (token) {
      if (window.confirm) {
        let config = {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
        setLoading(true)
        axios
          .post(`/delete-food/${id}`, config)
          .then((res) => {
            console.log(res.data)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      }
    }
  }
  return (
    <div className="food-card" key={id}>
      <div className="img-container">
        <img src={food_image} alt={name} />
      </div>
      <div className="food-content">
        <h3>
          {name} <span>Tshs{cost}</span>
        </h3>
        <p className="plates">
          <span>Qty: {plates && plates > 0 ? plates : 0}</span>
          <span className={plates && plates > 0 ? "success" : "error"}>
            {plates && plates > 0 ? "Available" : "Out of stock"}
          </span>
        </p>
        <p>{description}</p>
        <div className="btns">
          <Link className="edit" to={`/dashboard/food/edit-food?q=${id}`}>
            Edit
          </Link>
          <span className="delete" onClick={() => remove(id, name)}>
            {loading ? "Removing" : "Remove"}
          </span>
          <Link
            className="orders btn btn-primary"
            to={`/dashboard/food/orders/food?q=${id}`}
          >
            View orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
