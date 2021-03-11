import React from "react"
import { useAuthState, useAuthDispatch } from "../context/auth"
import RelatedUsers from "../components/user/RelatedUsers"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"

const Home = () => {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  let keyword = null
  const handleChange = (e) => {
    keyword = e.target.value
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `/search/?q=${keyword}`
  }
  return (
    <div>
      {user ? (
        <>
          <div>Hello {user.username}</div>
        </>
      ) : (
        <>
          <div>Welcome to our site</div>
        </>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          placeholder="Search profiles"
          name="keyword"
          handleChange={handleChange}
        />
        <FormButton text="Search" />
      </form>
      <RelatedUsers />
    </div>
  )
}

export default Home
