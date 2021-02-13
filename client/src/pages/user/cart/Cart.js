import React, { useContext } from "react"

import { Link } from "react-router-dom"

import { CartContext } from "../../../context/CartContext"
// import { FoodContext } from "../../../context/FoodContext"

import CartCard from "../../../components/cart/Cart"

const Carts = () => {
  let [cart, setCart] = useContext(CartContext)
  let amount = (item) => {
    return item.cost * item.number
  }

  let sum = (prev, next) => {
    return prev + next
  }

  let totalCost = 0
  if (cart) totalCost = cart.map(amount).reduce(sum, 0)

  return (
    <div className="cart-container">
      <div
        className="container"
        style={{
          padding: "20px 0 70px",
        }}
      >
        {cart.length === 0 && <h2>Your Cart is empty!!</h2>}
        <div
          style={{
            textAlign: "right",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {totalCost > 0 && `total cost = ${totalCost}`}
        </div>
        {cart &&
          cart.map(({ id, name, cost, number }) => (
            <CartCard
              id={id}
              name={name}
              cost={cost}
              number={number}
              key={id}
            />
          ))}
        <div
          style={{
            textAlign: "right",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {totalCost > 0 && `total cost = ${totalCost}`}
        </div>
        {cart.length > 0 && (
          <Link
            to={{ pathname: `/cart/checkout`, state: { totalCost } }}
            className="btn btn-primary"
            style={{
              width: "100%",
              maxWidth: "600px",
              // background: "red",
              margin: "20px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // color: "white",
            }}
          >
            Check Out
          </Link>
        )}
      </div>
    </div>
  )
}

export default Carts
