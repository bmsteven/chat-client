import React from "react"

const Search = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input placeholder="Search anything" />
    </form>
  )
}

export default Search
