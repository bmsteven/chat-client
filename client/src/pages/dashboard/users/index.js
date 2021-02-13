import React from "react"
import { Switch, Route } from "react-router-dom"

import AllUsers from "./AllUsers"
import UserOrders from "./UserOrders"
import Team from "./Team"

const Users = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard/users">
          <AllUsers />
        </Route>
        <Route path="/dashboard/users/orders">
          <UserOrders />
        </Route>
        <Route exact path="/dashboard/users/team">
          <Team />
        </Route>
      </Switch>
    </div>
  )
}

export default Users
