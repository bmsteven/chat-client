import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { useAuthState, useAuthDispatch } from "../context/auth"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"
import { VERIFY_ACCOUNT } from "../graphql/mutations"
import "../styles/auth.sass"

const VerifyAccount = () => {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const [code, setCode] = useState("")

  const [errors, setErrors] = useState({})
  const [verifyUserAccount, { loading }] = useMutation(VERIFY_ACCOUNT, {
    update(_, res) {
      dispatch({ type: "AUTH", payload: res.data.verifyAccount })
      setErrors({})
      window.location.href = `/add-username`
    },
    onError(err) {
      if (err.graphQLErrors && err.graphQLErrors[0]) {
        setErrors({ msg: err.graphQLErrors[0].extensions.error })
      }
    },
  })
  const handleChange = (e) => {
    let { value } = e.target
    if (value === "") {
      setErrors({ code: "This field must not be empty" })
      setCode(parseInt(value))
    } else {
      setErrors({})
      setCode(parseInt(value))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (code === "") {
      setErrors({ code: "This field must not be empty" })
    } else {
      verifyUserAccount({
        variables: { code },
      })
    }
  }
  return (
    <div className="auth verify-code">
      <div className="container">
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
          {errors.msg && <p className="alert alert-danger">{errors.msg}</p>}
          <FormButton
            text={loading ? "Please Wait" : "Verify Account"}
            btnClass="primary"
            btnGroupClass=""
          />
        </form>
      </div>
    </div>
  )
}

export default VerifyAccount
