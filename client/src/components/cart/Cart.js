import React, { useEffect, useContext } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { CartContext } from "../../context/CartContext"
import { FoodContext } from "../../context/FoodContext"

import "./cart.sass"

const CartCard = ({ id, name, cost, number }) => {
  let [cart, setCart] = useContext(CartContext)
  let [foods, setFoods] = useContext(FoodContext)
  let cartFood
  if (foods && foods.data) cartFood = foods.data.filter((o) => o.id === id)
  // console.log(cartFood)
  const add = () => {
    if (cartFood && cartFood.length > 0 && cartFood[0].plates > 0) {
      if (number > cartFood[0].plates - 1) {
        // console.log("nope")
        return null
      } else {
        // console.log(number)
        setCart(
          cart.map((item) => {
            if (id === item.id) {
              // console.log(id)
              saveLocalCarts()
              return {
                ...item,
                number: item.number + 1,
              }
            }
            return item
          })
        )
      }
    }
  }

  const minus = () => {
    if (cartFood && cartFood[0] && cartFood[0].plates > 0) {
      if (number <= 1) {
        return null
      } else {
        setCart(
          cart.map((item) => {
            if (id === item.id) {
              saveLocalCarts()
              return {
                ...item,
                number: item.number - 1,
              }
            }
            return item
          })
        )
      }
    }
  }

  const removeFromCart = () => {
    if (cart && cart.length > 1) {
      setCart(cart.filter((o) => o.id != id))
    } else {
      setCart(cart.filter((o) => o.id != id))
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }

  const saveLocalCarts = () => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", JSON.stringify([]))
    } else {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }

  useEffect(() => {
    saveLocalCarts()
  }, [cart])

  return (
    <div className="cart-card">
      {foods.loading ? (
        <>
          <div className="loading-animation" />
        </>
      ) : (
        <>
          {cartFood && (
            <>
              <div className="img-container">
                {cartFood && cartFood.length > 0 && (
                  <img src={cartFood[0].food_image} alt={name} />
                )}
              </div>
              <div className="cart-details">
                <div className="name">
                  {name}{" "}
                  <span
                    className={
                      cartFood &&
                      cartFood.length > 0 &&
                      cartFood[0].plates &&
                      cartFood[0].plates > 0
                        ? `success`
                        : "error"
                    }
                  >
                    {cartFood &&
                    cartFood.length > 0 &&
                    cartFood[0].plates &&
                    cartFood[0].plates > 0
                      ? "available"
                      : "Out of stock"}
                  </span>
                </div>
                {cartFood && cartFood.length > 0 && (
                  <div className="cost">&#64; Tshs {cartFood[0].cost}</div>
                )}
                <div className="counter">
                  <span onClick={minus} className="span">
                    <AiOutlineMinus className="icon" />
                  </span>
                  <span className="number">{number && number}</span>
                  <span onClick={add} className="span">
                    <AiOutlinePlus className="icon" />
                  </span>
                </div>
                <div className="remove">
                  <span onClick={removeFromCart}>Remove</span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CartCard
