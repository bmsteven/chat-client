import React, { useState } from "react"
import FilterDays from "./FilterDays"
import moment from "moment"

const DateTime = ({ message, days }) => {
  const { id, date } = message
  let [dates, filterDates] = useState(days)
  let filter = dates.filter((el) => el.selectedId === id)
  const showDates = () => {
    // filterDates({})
  }
  let time = moment(date).format("MMMM DD, YYYY")
  let today = new Date(Date.now()).setHours(0, 0, 0, 0)

  let yesterday = new Date(Date.now()).setHours(0, 0, 0, 0) - 864e5
  if (today == new Date(date).setHours(0, 0, 0, 0)) time = "Today"
  if (yesterday == new Date(date).setHours(0, 0, 0, 0)) time = "Yesterday"

  return (
    <div className="day" id={id}>
      <span className="active-day" onClick={showDates}>
        {time}
      </span>
      {/* {days.length > 1 && (
        <>
          <h3>filter</h3>
          {days.map((day) => (
            <div className={filter ? "filter selected" : "filter"}>
              <FilterDays day={day} />
            </div>
          ))}
        </>
      )} */}
    </div>
  )
}

export default DateTime
