import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useAuthDispatch } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"

const REGISTER_USER = gql`
  mutation register(
    $first_name: String!
    $middle_name: String
    $last_name: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      first_name: $first_name
      middle_name: $middle_name
      last_name: $last_name
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      verified
      token
      verification_code
    }
  }
`

const Register = (props) => {
  const [variables, setVariables] = useState({
    first_name: "",
    middle_name: "",
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
      // authenticate user here
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
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser({
      variables,
    })
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
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
          name="middle_name"
          handleChange={handleChange}
          placeholder="Middle Name"
          id="middle-name"
          title="Middle Name:"
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
          type="text"
          name="username"
          handleChange={handleChange}
          placeholder="username"
          id="username"
          title="Username:"
          error={errors.username && errors.username}
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
        <FormButton
          text={loading ? "Please Wait" : "Register"}
          btnClass="primary"
          btnGroupClass=""
        />
      </form>
    </div>
  )
}

export default Register
