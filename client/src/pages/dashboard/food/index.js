import React from "react"
import { Switch, Route } from "react-router-dom"

import Food from "./Food"
import NewFood from "./NewFood"
import EditFood from "./EditFood"
import FoodOrders from "./FoodOrders"

const Foods = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard/food">
          <Food />
        </Route>
        <Route exact path="/dashboard/food/new">
          <NewFood />
        </Route>
        <Route exact path="/dashboard/food/:slug">
          <EditFood />
        </Route>
        <Route exact path="/dashboard/food/orders/:slug">
          <FoodOrders />
        </Route>
      </Switch>
    </div>
  )
}

export default Foods
