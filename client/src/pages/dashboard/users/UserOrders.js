import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import PageHeader from "../../../components/dashboard/PageHeader"

const UserOrders = () => {
  let [orders, setOrders] = useState()
  let [msg, setMsg] = useState()
  let [err, setErr] = useState()
  let data = useLocation()
  let token = localStorage.getItem("token")
  let config = {
    headers: {
      // "Content-Type": "application/json",
      authorization: token,
    },
  }
  useEffect(() => {
    axios
      .get(`/user-orders/${data.state.id}`, config)
      .then((res) => {
        if (res.data.results) setOrders(res.data.results)
        else if (res.data.msg) setMsg(res.data.msg)
        else if (res.data.err) setErr(res.data.err)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className="dashboard-content team">
      <div className="main-content">
        <PageHeader>
          <Link to="/dashboard/users">Users /</Link>Orders
        </PageHeader>
      </div>
      <div className="dashboard-team">
        {msg && msg}
        {err && err}
        {orders &&
          orders.map(({ id, food_name, number_of_plates }) => (
            <div key={id}>
              {food_name}
              <br />
              {/* {orderedBy} */}
              number of plates: {number_of_plates}
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserOrders
