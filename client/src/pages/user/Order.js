import React, { useContext } from "react"
import Banner from "../../components/banner/Banner"
import { useParams } from "react-router-dom"
import { FoodContext } from "../../context/FoodContext"
import OrderForm from "../../components/order/OrderForm"

import MenuBar from "../../components/menu/MenuBar"
import FloatHeader from "../../components/floatHeader/FloatHeader"

const Order = () => {
  let [foods, setFoods] = useContext(FoodContext)
  const search = window.location.search
  const params = new URLSearchParams(search)
  const slug = params.get("q")

  let data = foods.data
  let orderedFood
  // let { id } = useParams()
  if (data) orderedFood = data.filter((o) => o.id == slug)
  // console.log(setFoods)

  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>Create an Order</h1>
        </div>
      </Banner>
      <div className="order">
        <div className="container">
          {data && orderedFood && orderedFood[0] ? (
            <div className="food-details">
              <h2>{orderedFood[0].name}</h2>
              <div className="img-container">
                <img
                  src={orderedFood[0].food_image}
                  alt={orderedFood[0].name}
                />
              </div>
              <p>{orderedFood[0].description}</p>
              <p>{orderedFood[0].cost}</p>
            </div>
          ) : (
            <h2>Food Not Found</h2>
          )}
          <div className="order-form">
            {orderedFood && orderedFood[0] && (
              <OrderForm food={orderedFood[0]} />
            )}
          </div>
        </div>
      </div>
      <MenuBar />
    </div>
  )
}

export default Order
