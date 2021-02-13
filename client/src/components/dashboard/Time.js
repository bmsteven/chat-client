import React, { useEffect } from "react"

const Time = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const Today = () => {
    const today = new Date()
    const date = `${days[today.getDay()]} - ${
      months[today.getMonth()]
    } ${today.getDate()}, ${today.getFullYear()}`
    return date
  }
  useEffect(() => {
    Today()
  })
  return <span className="time">{Today()}</span>
}

export default Time
