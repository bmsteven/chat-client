import React from "react"

const FilterDays = ({ day }) => {
  const { id, date } = day
  let time = date
  let today = new Date(Date.now()).setHours(0, 0, 0, 0)
  let yesterday = new Date(Date.now()).setHours(0, 0, 0, 0) - 864e5
  if (today == new Date(date).setHours(0, 0, 0, 0)) time = "Today"
  if (yesterday == new Date(date).setHours(0, 0, 0, 0)) time = "Yesterday"
  return (
    <div key={id} className="filter-day">
      <a href={`#${id}`}>{time}</a>
    </div>
  )
}

export default FilterDays
