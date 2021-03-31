import React from "react"
import "./input.sass"

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
  success,
}) => {
  return (
    <div
      className={
        error
          ? `form-control ${inputClass} error`
          : `form-control ${inputClass}`
      }
    >
      <label htmlFor={id} className="text-primary">
        {title}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={(e) => handleChange(e)}
      />
      {error && <small className="text-danger">{error}</small>}
      {success && <small className="text-success">{success}</small>}
    </div>
  )
}

export default Input
