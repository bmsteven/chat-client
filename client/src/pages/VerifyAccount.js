import React, { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useAuthState, useAuthDispatch } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"

const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($code: Int!) {
    verifyAccount(code: $code) {
      verified
      token
    }
  }
`

const VerifyAccount = () => {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const [variables, setVariables] = useState({
    code: "",
  })

  const [errors, setErrors] = useState({})
  const [verifyUserAccount, { loading }] = useMutation(VERIFY_ACCOUNT, {
    update(_, res) {
      dispatch({ type: "AUTH", payload: res.data.verifyAccount })
      setErrors({})
      window.location.href = `/`
    },
    onError(err) {
      if (err.graphQLErrors && err.graphQLErrors[0]) {
        setErrors({ msg: err.graphQLErrors[0].extensions.error })
      }
    },
  })
  const handleChange = (e) => {
    let { name, value } = e.target
    if (value === "") {
      setErrors({ code: "This field must not be empty" })
      setVariables({
        [name]: parseInt(value),
      })
    } else {
      setErrors({})
      setVariables({
        [name]: parseInt(value),
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (variables.code === "") {
      setErrors({ code: "This field must not be empty" })
    } else {
      verifyUserAccount({
        variables,
      })
    }
  }
  return (
    <div>
      {user && <h1>Welcome {user.username}, please verify your account</h1>}
      {user && <p>Your verification code is {user.verification_code}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="number"
          name="code"
          handleChange={handleChange}
          placeholder="------"
          title="Verify Code:"
          id="verify-code"
          error={errors.code && errors.code}
        />
        {errors.msg && <p>{errors.msg}</p>}
        <FormButton
          text={loading ? "Please Wait" : "Verify Account"}
          btnClass="primary"
          btnGroupClass=""
        />
      </form>
    </div>
  )
}

export default VerifyAccount
