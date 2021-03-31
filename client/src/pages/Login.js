import React, { useState } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import { useAuthDispatch } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"
import "../styles/auth.sass"

const LOGIN = gql`
  query login($email_username: String!, $password: String!) {
    login(email_username: $email_username, password: $password) {
      verified
      token
      username
    }
  }
`

const Login = () => {
  const [variables, setVariables] = useState({
    email_username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const dispatch = useAuthDispatch()

  const [loginUser, { loading }] = useLazyQuery(LOGIN, {
    onError(err) {
      if (err.graphQLErrors && err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.errors)
      }
    },
    onCompleted(res) {
      setErrors({})
      dispatch({ type: "LOGIN", payload: res.login })
      if (!res.login.verified) {
        window.location.href = `/verify-account/user_account?verified=${res.login.verified}`
      } else {
        window.location.href = `/`
      }
    },
  })
  const handleChange = (e) => {
    let { name, value } = e.target
    setVariables({
      ...variables,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser({
      variables,
    })
  }
  return (
    <div className="auth login">
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Log in to your account</h2>
          <Input
            type="text"
            name="email_username"
            handleChange={handleChange}
            id="email_username"
            title="Email/username:"
            error={errors.email_username && errors.email_username}
          />
          <Input
            type="password"
            name="password"
            handleChange={handleChange}
            id="password"
            title="Password:"
          />
          {errors.password && (
            <p className="alert alert-danger">{errors.password}</p>
          )}
          <FormButton
            text={loading ? "Please Wait" : "Login"}
            btnClass="primary"
            btnGroupClass=""
          />
        </form>
        <div className="extra-stuffs">
          Don't have an account yet? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
