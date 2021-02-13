import React, { useContext, useEffect, useState } from "react"
import Banner from "../../components/banner/Banner"
import { UserContext } from "../../context/UserContext"
import axios from "axios"

import MenuBar from "../../components/menu/MenuBar"
import FloatHeader from "../../components/floatHeader/FloatHeader"
import Footer from "../../components/footer/Footer"

const MyOrders = () => {
  let [user, setUser] = useContext(UserContext)
  let [orders, setOrders] = useState()
  let token = localStorage.getItem("token")
  // console.log(setUser)
  useEffect(() => {
    if (user.data) {
      let config = {
        headers: {
          authorization: token,
        },
      }
      axios
        .get("/my-orders", config)
        .then((res) => {
          console.log(res.data)
          if (res.data.results) {
            setOrders(res.data.results)
            console.log(orders)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [setOrders])
  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>My Orders</h1>
        </div>
      </Banner>
      <div className="orders">
        <div className="container">
          {orders &&
            orders.map(
              ({
                food_name,
                delivery_time,
                delivered,
                special_description,
                id,
              }) => (
                <div key={id}>
                  <h3>{food_name}</h3>
                  <p>{special_description}</p>
                  <span>{delivery_time}</span> <br />
                  <span>Delivered: {delivered ? "Yes" : "No"}</span>
                </div>
              )
            )}
        </div>
      </div>
      <MenuBar />
    </div>
  )
}

export default MyOrders
