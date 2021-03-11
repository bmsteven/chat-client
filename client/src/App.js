import React, { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import { useAuthDispatch, useAuthState } from "./context/auth"

// pages
// import Home from "./pages/Home"
// import Register from "./pages/Register"
// import Login from "./pages/Login"
// import VerifyAccount from "./pages/VerifyAccount"
// import Search from "./pages/Search"
// import Profile from "./pages/Profile"
// import Followers from "./pages/Followers"
// import Followings from "./pages/Followings"
// import Connections from "./pages/Connections"
// import UserProfile from "./pages/UserProfile"
// import ConnectionsRequests from "./pages/ConnectionsRequests"
// import MyRequests from "./pages/MyRequests"
// import Chats from "./pages/chats/Chats"

const Home = React.lazy(() => import("./pages/Home"))
const Register = React.lazy(() => import("./pages/Register"))
const Login = React.lazy(() => import("./pages/Login"))
const VerifyAccount = React.lazy(() => import("./pages/VerifyAccount"))
const Search = React.lazy(() => import("./pages/Search"))
const Profile = React.lazy(() => import("./pages/Profile"))
const Followers = React.lazy(() => import("./pages/Followers"))
const Followings = React.lazy(() => import("./pages/Followings"))
const Connections = React.lazy(() => import("./pages/Connections"))
const UserProfile = React.lazy(() => import("./pages/UserProfile"))
const ConnectionsRequests = React.lazy(() =>
  import("./pages/ConnectionsRequests")
)
const MyRequests = React.lazy(() => import("./pages/MyRequests"))
const Chats = React.lazy(() => import("./pages/chats/Chats"))

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
  const { user, isAuthenticated, userLoading } = useAuthState()
  console.log(user, userLoading)
  let history = useHistory()
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
  const goBack = () => {
    history.goBack()
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
          <Link to="/">Home</Link>{" "}
          {user ? (
            <>
              <Link to="/user/profile">View Profile</Link>{" "}
              <Link to="/chats">Chats</Link>{" "}
              <button onClick={logout}>Logout</button>{" "}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>{" "}
              <Link to="/register">Register</Link>{" "}
            </>
          )}
          <button onClick={goBack}>Go back</button>
          <Switch>
            <Route exact path="/" render={() => <Home />} />

            <Route path="/register" render={() => <Register />} />

            <Route path="/login" render={() => <Login />} />

            <Route path="/verify-account" render={() => <VerifyAccount />} />
            <Route
              path="/verify-account/:slug"
              render={() => <VerifyAccount />}
            />

            <Route path="/search/:slug" render={() => <Search />} />

            <Route path="/search" render={() => <Search />} />
            <Route exact path="/p" render={() => <Search />} />
            <Route path="/p/:slug" render={() => <Profile />} />
            <Route path="/connections/:slug" render={() => <Connections />} />
            <Route path="/followers/:slug" render={() => <Followers />} />
            <Route path="/followings/:slug" render={() => <Followings />} />
            <Route path="/user/profile" render={() => <UserProfile />} />
            <Route path="/user" render={() => <UserProfile />} />
            <Route path="/requests" render={() => <ConnectionsRequests />} />
            <Route path="/my-requests" render={() => <MyRequests />} />
            <Route path="/chats" render={() => <Chats />} />
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
