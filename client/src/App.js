import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import { useAuthDispatch, useAuthState } from "./context/auth"

// pages
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import VerifyAccount from "./pages/VerifyAccount"
import Search from "./pages/Search"
import Profile from "./pages/Profile"

const GET_USER = gql`
  query auth {
    auth {
      id
      username
      verified
      verification_code
      first_name
      middle_name
      last_name
      bio
      dp
      cover_image
      DOB
      about
      gender
    }
  }
`

const App = () => {
  const [error, setError] = useState(null)
  const dispatch = useAuthDispatch()
  const { user } = useAuthState()
  const [getUser, { loading }] = useLazyQuery(GET_USER, {
    onError(err) {
      setError("Internal server error, couldn't load user")
    },
    onCompleted(res) {
      dispatch({ type: "AUTH", payload: res.auth })
    },
  })
  const logout = () => {
    dispatch({ type: "LOGOUT" })
  }
  useEffect(() => {
    getUser()
  }, [getUser])
  return (
    <div className="app">
      {loading ? (
        "Loading"
      ) : (
        <Router>
          <Link to="/">Home</Link>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="register">Register</Link>
            </>
          )}

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/verify-account">
              <VerifyAccount />
            </Route>
            <Route path="/verify-account/:slug">
              <VerifyAccount />
            </Route>
            <Route path="/search/:slug">
              <Search />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route exact path="/p">
              <Search />
            </Route>
            <Route path="/p/:slug">
              <Profile />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
