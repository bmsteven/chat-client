import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import PageHeader from "../../components/dashboard/PageHeader"

const Orders = () => {
  let [orders, setOrders] = useState()
  let token = localStorage.getItem("token")
  useEffect(() => {
    let config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .get("/orders", config)
      .then((res) => {
        console.log(res.data)
        if (res.data.output) {
          setOrders(res.data.output)
          console.log(orders)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setOrders, orders])
  return (
    <div className="dashboard-content orders">
      <div className="main-content">
        <PageHeader>Orders</PageHeader>
      </div>
      <div className="dashboard-orders">
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
      </div>
    </div>
  )
}

export default Orders
