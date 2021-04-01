import React from "react"
import { useHistory, Link } from "react-router-dom"
import { useAuthState, useAuthDispatch } from "../context/auth"
import RelatedUsers from "../components/user/RelatedUsers"
import Input from "../components/input/Input"
import FormButton from "../components/form_button/FormButton"

const Home = () => {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  let history = useHistory()
  let keyword = null
  const handleChange = (e) => {
    keyword = e.target.value
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `/search/?q=${keyword}`
  }
  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const goBack = () => {
    history.goBack()
  }
  return (
    <div>
      {user ? (
        <>
          <div>Hello {user.username}</div>
          <Link to="/chats">Chats</Link>
          <button onClick={logout}>Logout</button>
          <button onClick={goBack}>Go Back</button>
        </>
      ) : (
        <>
          <div>Welcome to our site</div>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
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
