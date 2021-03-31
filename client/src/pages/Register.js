import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { useAuthDispatch } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"
import { REGISTER_USER } from "../graphql/mutations"
import "../styles/register.sass"

const Register = (props) => {
  const [variables, setVariables] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const dispatch = useAuthDispatch()
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res) {
      setErrors({})
      if (res) {
        dispatch({ type: "REGISTER", payload: res.data.register })
        window.location.href = `/verify-account/user_account?verified=${res.data.register.verified}`
      }
    },
    onError(err) {
      console.log(err)
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.errors)
      }
    },
  })
  const handleChange = (e) => {
    let { name, value } = e.target
    setVariables({
      ...variables,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: "",
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser({
      variables,
    })
  }
  return (
    <div className="register">
      <div className="container">
        <div className="column left-column">
          <h1>We Revolutionize </h1>
        </div>
        <div className="column right-column">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>
              Welcome to <span>ConnectIR</span>
            </h2>
            <p>We make it easy for professionals to connect</p>
            <Input
              type="text"
              name="first_name"
              handleChange={handleChange}
              placeholder="First Name"
              id="first_name"
              title="First Name:"
              error={errors.first_name && errors.first_name}
            />
            <Input
              type="text"
              name="last_name"
              handleChange={handleChange}
              placeholder="Last Name"
              id="last-name"
              title="Last Name:"
              error={errors.last_name && errors.last_name}
            />
            <Input
              type="email"
              name="email"
              handleChange={handleChange}
              placeholder="email@example.com"
              id="email"
              title="Email address:"
              error={errors.email && errors.email}
            />
            <Input
              type="password"
              name="password"
              handleChange={handleChange}
              placeholder=""
              id="password"
              title="Password:"
              error={errors.password && errors.password}
            />
            <Input
              type="password"
              name="confirmPassword"
              handleChange={handleChange}
              placeholder=""
              id="confirm-password"
              title="Confirm Password:"
              error={errors.confirmPassword && errors.confirmPassword}
            />
            <p
              style={{
                fontSize: ".9rem",
              }}
            >
              By Registering you agree with our{" "}
              <Link to="/">Privacy Policy</Link> and{" "}
              <Link to="/">Terms and conditions</Link>
            </p>
            {errors && Object.keys(errors).keys.length > 0 && (
              <p className="alert alert-danger">
                You have error(s) in your form
              </p>
            )}
            <FormButton
              text={loading ? "Please Wait" : "Register"}
              btnClass={loading ? "disabled" : "primary"}
              btnGroupClass=""
            />
          </form>
          <div className="extra-stuffs">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
