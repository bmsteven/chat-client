import React, { useEffect, useState, useContext } from "react"
import { Switch, Route } from "react-router-dom"
import axios from "axios"
import { MdClose } from "react-icons/all"
import { UserContext } from "./context/UserContext"
import { FoodContext } from "./context/FoodContext"

// styles
import "./styles/style.sass"

// pages
const Home = React.lazy(() => import("./pages/"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Signup = React.lazy(() => import("./pages/auth/Signup"))
const About = React.lazy(() => import("./pages/About"))
const Contact = React.lazy(() => import("./pages/Contact"))
const Help = React.lazy(() => import("./pages/Help"))

// users
const Cart = React.lazy(() => import("./pages/user/cart/"))
const Profile = React.lazy(() => import("./pages/user/Profile"))
const Favourites = React.lazy(() => import("./pages/user/Favourites"))
const Order = React.lazy(() => import("./pages/user/Order"))
const MyOrders = React.lazy(() => import("./pages/user/MyOrders"))

// admin
const Dashboard = React.lazy(() => import("./pages/dashboard/"))
const Menu = React.lazy(() => import("./pages/Menu"))

// axios.defaults.baseURL = "http://faraja-food-uber.herokuapp.com/api"
axios.defaults.baseURL = "http://localhost:5000/api"

const App = () => {
  let [user, setUser] = useContext(UserContext)
  let [foods, setFoods] = useContext(FoodContext)
  let [msg, setMsg] = useState(null)

  useEffect(() => {
    let token = localStorage.getItem("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
    axios
      .get("/auth", config)
      .then((res) => {
        if (res.data) {
          setUser({
            ...user,
            isAuthenticated: true,
            data: res.data.results,
            loading: false,
          })
        }
      })
      .catch((err) => {
        // console.log(err)
        setUser({
          ...user,
          loading: false,
        })
      })
  }, [user])

  // console.log(user)
  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    axios
      .get("/get-foods", config)
      .then((res) => {
        if (res.data) {
          setFoods({
            ...foods,
            loading: false,
            data: res.data.results,
          })
        }
      })
      .catch((err) => {
        setFoods({
          ...foods,
          loading: false,
        })
        // console.log(err)
      })
  }, [foods])
  return (
    <div className="App">
      {msg && (
        <div className="alert-popup alert-success">
          <span>{msg}</span>
          <span className="close" onClick={() => setMsg("")}>
            <MdClose className="icon" />
          </span>
        </div>
      )}
      {/* {loading ? (
        <div className="loading-screen">
          <div className="container">
            <img src={logo} alt="logo" />
            <span>Please Wait...</span>
          </div>
        </div>
      ) : ( */}
      <>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route
            exact
            path="/signup"
            render={() => <Signup setMsg={setMsg} />}
          />
          <Route exact path="/menu" render={() => <Menu />} />
          <Route path="/cart" render={() => <Cart />} />
          <Route path="/order/:slug" render={() => <Order />} />
          {/* auth routes */}
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/my-orders/" render={() => <MyOrders />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/favourites" render={() => <Favourites />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/contact" render={() => <Contact />} />
          <Route exact path="/help" render={() => <Help />} />
        </Switch>
      </>
    </div>
  )
}

export default App
