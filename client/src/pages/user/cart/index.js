import React from "react"
import { Switch, Route } from "react-router-dom"

import Banner from "../../../components/banner/Banner"
import MenuBar from "../../../components/menu/MenuBar"
import FloatHeader from "../../../components/floatHeader/FloatHeader"

import Carts from "./Cart"
import Checkout from "./Checkout"

const Cart = () => {
  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>Cart</h1>
        </div>
      </Banner>
      <Switch>
        <Route exact path="/cart">
          <Carts />
        </Route>
        <Route path="/cart/checkout">
          <Checkout />
        </Route>
        {/* <Route>Error</Route> */}
      </Switch>
      <MenuBar />
    </div>
  )
}

export default Cart
