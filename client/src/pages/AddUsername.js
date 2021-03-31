import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useMutation, useLazyQuery } from "@apollo/client"
import { useAuthDispatch, useAuthState } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"
import { ADD_USERNAME } from "../graphql/mutations"
import { CHECK_USERNAME } from "../graphql/queries"

let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/

const AddUsername = () => {
  const [username, setUsername] = useState("")

  const [errors, setErrors] = useState({})
  const dispatch = useAuthDispatch()

  let { user } = useAuthState()

  const [checkUsername, { checkLoading }] = useLazyQuery(CHECK_USERNAME, {
    onCompleted(res) {
      if (res.checkUsername === "OK") {
        setErrors({
          success: res.checkUsername,
        })
      } else {
        setErrors({
          username: `${res.checkUsername}`,
        })
      }
    },
  })
  const [addUsername, { loading }] = useMutation(ADD_USERNAME, {
    update(_, res) {
      dispatch({ type: "AUTH", payload: res.data.addUsername })
      setErrors({})
      window.location.href = `/`
    },
    onError(err) {
      if (err.graphQLErrors && err.graphQLErrors[0]) {
        setErrors({ username: err.graphQLErrors[0].extensions.error })
      }
    },
  })

  const handleChange = (e) => {
    let { value } = e.target
    setUsername(value)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (errors?.username)
      setErrors({ ...errors, msg: "There is and error(s) in your form" })
    if (username.trim() === "")
      setErrors({ ...errors, username: "This field is required" })
    if (errors?.success == "OK") addUsername({ variables: { username } })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      let chars = format.exec(username)
      if (format.test(username))
        setErrors({
          ...errors,
          msg: "Your username contains reserved character(s)",
          success: null,
        })
      if (chars)
        setErrors({
          ...errors,
          username: `${chars[0]} is reserved character`,
          success: null,
        })
      if (!chars && !format.test(username))
        if (username.trim() != "")
          checkUsername({
            variables: { username },
          })
    }, 500)
    return () => clearTimeout(timeout)
  }, [username])
  if (user?.username != null)
    return (
      <>
        <Redirect to="/" />
      </>
    )
  return (
    <div className="auth">
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="username"
            handleChange={handleChange}
            placeholder="username"
            id="username"
            title="Username:"
            success={errors.success && errors.success}
            error={errors.username && errors.username}
          />
          {errors?.msg && <p>{errors.msg}</p>}
          <FormButton
            text={loading ? "Please Wait" : "Save"}
            btnClass="primary"
            btnGroupClass=""
          />
        </form>
      </div>
    </div>
  )
}

export default AddUsername
