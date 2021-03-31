import React from "react"
import "./input.sass"

const SearchInput = ({ name, type, placeholder, value, handleChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  )
}

export default SearchInput
