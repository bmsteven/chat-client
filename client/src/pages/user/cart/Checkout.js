import React, { useState, useContext } from "react"
// import { useLocation } from "react-router-dom"
import axios from "axios"

import { CartContext } from "../../../context/CartContext"
import { UserContext } from "../../../context/UserContext"

const Checkout = () => {
  //   let data = useLocation()
  let [user, setUser] = useContext(UserContext)
  let [error, setError] = useState("")
  let [msg, setMsg] = useState("")
  let [location, setLocation] = useState({
    lat:
      user.data && user.data.location && user.data.location.lat
        ? user.data.location.lat
        : "",
    lng:
      user.data && user.data.location && user.data.location.lng
        ? user.data.location.lng
        : "",
  })
  let [loading, setLoading] = useState(false)
  let [formData, setFormdata] = useState({
    date: "",
    number_of_plates: "",
    tel: user.data && user.data.tel ? user.data.tel : "",
    orderedBy: user.data && user.data.name ? user.data.name : "",
    address: user.data && user.data.address ? user.data.address : "",
  })
  let { date, tel, orderedBy, address } = formData

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          console.log(location)
        },
        () => {
          setError("Failed to retrieve your location")
        }
      )
    } else {
      setError("Your Browser doesn't support this feature")
    }
  }
  let [cart, setCart] = useContext(CartContext)
  let amount = (item) => {
    return item.cost * item.number
  }

  let sum = (prev, next) => {
    return prev + next
  }

  let totalCost = 0
  if (cart) totalCost = cart.map(amount).reduce(sum, 0)

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value,
    })
    // console.log(formData)
  }

  let token = localStorage.getItem("token")

  const placeOrder = (e) => {
    e.preventDefault()
    setLoading(true)
    let config = {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    }
    let body = {
      location: JSON.stringify(location),
      foods: JSON.stringify(cart),
      orderedBy: JSON.stringify({
        id: user && user.data && user.data.id,
        orderedBy,
        address,
        tel,
      }),
      totalCost,
    }
    axios
      .post(`/order-foods`, body, config)
      .then((res) => {
        // console.log(res.data)
        setLoading(false)
        if (res.data.msg) {
          setMsg("Your order was placed successful, Thanks for ordering")
        } else if (res.data.error) {
          setError(res.data.error)
        }
      })
      .catch((err) => {
        // console.log(err)
        setLoading(false)
        setError("Internal server error, please try again")
      })
  }

  return (
    <>
      By allowing location you help us find you when delivering food
      {totalCost > 0 && totalCost}
      <button onClick={getLocation}>Set Location</button>
      <form onSubmit={(e) => placeOrder(e)}>
        <input
          type="text"
          name="address"
          onChange={(e) => handleChange(e)}
          value={address}
          placeholder="address"
        />
        <input
          type="text"
          name="orderedBy"
          onChange={(e) => handleChange(e)}
          value={orderedBy}
          placeholder="name"
        />
        <input
          type="text"
          name="tel"
          onChange={(e) => handleChange(e)}
          value={tel}
          placeholder="tel"
        />
        <input
          type="datetime-local"
          name="date"
          onChange={(e) => handleChange(e)}
          value={date}
          placeholder="Enter date you want food to e delivered"
        />
        {cart && (
          <button disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </form>
      {msg && <p>{msg}</p>}
      {error && <p>{error}</p>}
    </>
  )
}

export default Checkout
