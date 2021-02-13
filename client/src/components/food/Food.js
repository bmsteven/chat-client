import React, { useState } from "react"
import FoodModal from "../foodModal/FoodModal"

//
import "./food.sass"

const Food = ({ name, id, food_image, description, cost, plates }) => {
  // const [cart, setCart] = useState([])
  let [open, setOpen] = useState(false)
  let cart = JSON.parse(localStorage.getItem("cart"))
  // console.log(cart)
  let number = 1
  if (cart) {
    cart.filter((o) => {
      if (o.id === id) {
        o.number ? (number = o.number) : (number = 1)
      } else {
        number = 1
      }
    })
  }

  const openModal = () => {
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }

  let foodProps = {
    name,
    id,
    food_image,
    description,
    cost,
    number,
    plates,
  }
  return (
    <>
      <div className="food" key={id} onClick={openModal}>
        <div className="img-container">
          <img src={food_image} alt={name} />
        </div>
        <div className="food-content">
          <h3>{name}</h3>
          {plates && plates > 0 ? (
            <span className="success">Available</span>
          ) : (
            <span className="error">Out of stock</span>
          )}
          <p>Price: {cost} Tshs</p>
          <div className="btns">
            <button className="btn-primary" onClick={openModal}>
              Preview
            </button>
          </div>
        </div>
      </div>
      {open && <FoodModal closeModal={closeModal} foodProps={foodProps} />}
    </>
  )
}

export default Food
