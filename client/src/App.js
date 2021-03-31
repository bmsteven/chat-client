import React, { useEffect, lazy } from "react"
import Cookies from "js-cookie"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { useAuthDispatch } from "./context/auth"
import { GET_USER } from "./graphql/queries"
import "./styles/styles.sass"
import "./styles/colors.sass"

const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))
const VerifyAccount = lazy(() => import("./pages/VerifyAccount"))
const AddUsername = lazy(() => import("./pages/AddUsername"))
const Search = lazy(() => import("./pages/Search"))
const Profile = lazy(() => import("./pages/Profile"))
const Followers = lazy(() => import("./pages/Followers"))
const Followings = lazy(() => import("./pages/Followings"))
const Connections = lazy(() => import("./pages/Connections"))
const Chats = lazy(() => import("./pages/chats/Chats"))

const App = () => {
  const dispatch = useAuthDispatch()
  let token = Cookies.get("token")
  const [getUser, { loading }] = useLazyQuery(GET_USER, {
    onCompleted(res) {
      dispatch({ type: "AUTH", payload: res.auth })
    },
  })

  useEffect(() => {
    if (token) getUser()
  }, [getUser])
  return (
    <div className="app">
      {loading ? (
        "Loading"
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/register" render={() => <Register />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/verify-account" render={() => <VerifyAccount />} />
            <Route
              path="/verify-account/:slug"
              render={() => <VerifyAccount />}
            />
            <Route path="/add-username" render={() => <AddUsername />} />
            <Route path="/search/:slug" render={() => <Search />} />
            <Route path="/search" render={() => <Search />} />
            <Route exact path="/p" render={() => <Search />} />
            <Route exact path="/p/:username" render={() => <Profile />} />
            <Route path="/followers/:username" render={() => <Followers />} />
            <Route path="/followings/:username" render={() => <Followings />} />
            <Route
              path="/connections/:username"
              render={() => <Connections />}
            />
            <Route path="/chats" render={() => <Chats />} />
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
