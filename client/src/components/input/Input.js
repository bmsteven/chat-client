import React from "react"

const Input = ({
  inputClass,
  name,
  id,
  type,
  placeholder,
  value,
  handleChange,
  title,
  error,
}) => {
  return (
    <div
      className={
        error
          ? `input control ${inputClass} error`
          : `input control ${inputClass}`
      }
    >
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={(e) => handleChange(e)}
      />
      {error && <small>{error}</small>}
    </div>
  )
}

export default Input
