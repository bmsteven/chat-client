import moment from "moment"

const groupedByDays = (messages) => {
  return messages.reduce((acc, el, i) => {
    let messageDay = moment(el.createdAt).format("YYYY-MM-DD")
    if (acc[messageDay]) {
      return {
        ...acc,
        [messageDay]: acc[messageDay].concat([el]),
      }
    } else {
      return {
        ...acc,
        [messageDay]: [el],
      }
    }
  }, {})
}

const generatedItems = (messages) => {
  const days = groupedByDays(messages)
  let sortedDays = Object.keys(days).sort(
    (a, b) => moment(b, "YYYY-MM-DD").unix() - moment(a, "YYYY-MM-DD").unix()
  )
  let items = sortedDays.reduce((acc, date) => {
    let sortedMessages = days[date].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    return acc.concat([...sortedMessages, { type: "day", date, id: date }])
  }, [])
  return items
}

export default generatedItems
