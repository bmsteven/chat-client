import React, { useContext, useState } from "react"
import axios from "axios"
// import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { UserContext } from "../../context/UserContext"
// import { useEffect } from "react"

const OrderForm = ({ food }) => {
  let [user, setUser] = useContext(UserContext)
  let [error, setError] = useState("")
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
    // location: user.data && user.data.location ? user.data.location : "",
    special_description: "",
    date: "",
    // time: "",
    number_of_plates: "",
    tel: user.data && user.data.tel ? user.data.tel : "",
    orderedBy: user.data && user.data.name ? user.data.name : "",
    address: user.data && user.data.address ? user.data.address : "",
  })

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
          console.log("Not retrieved")
        }
      )
    } else {
      console.log("Not supported")
    }
  }

  let {
    special_description,
    date,
    // time,
    number_of_plates,
    tel,
    orderedBy,
    address,
  } = formData

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value,
    })
    console.log(formData)
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

    // console.log(food)

    let delivery_time = date
    let body = {
      location: JSON.stringify(location),
      foods: JSON.stringify([
        {
          id: food.id,
          name: food.name,
          delivery_time,
          plates: number_of_plates,
          special_description,
        },
      ]),
      orderedBy: JSON.stringify({
        id: user && user.data && user.data.id,
        orderedBy,
        address,
        tel,
      }),
      totalCost: food.cost,
    }
    axios
      .post(`/order-foods`, body, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <>
      By allowing location you help us find you when delivering food
      <button onClick={getLocation}>Set Location</button>
      <form onSubmit={(e) => placeOrder(e)}>
        <textarea
          name="special_description"
          onChange={(e) => handleChange(e)}
          value={special_description}
          placeholder="describe"
        />
        <input
          type="text"
          name="address"
          onChange={(e) => handleChange(e)}
          value={address}
          placeholder="address"
        />
        <input
          type="number"
          name="number_of_plates"
          onChange={(e) => handleChange(e)}
          value={number_of_plates}
          placeholder="number of plates"
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
        {/* <input
          type="time"
          name="time"
          onChange={(e) => handleChange(e)}
          value={time}
          placeholder="Enter time you want food to be delivered"
        /> */}
        <button disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  )
}

export default OrderForm
