import React, { useEffect, useState } from "react"
import PageHeader from "../../../components/dashboard/PageHeader"
import axios from "axios"

// components
import User from "../../../components/user/User"
import defaultDp from "../../../assets/images/dp.png"

const AllUsers = () => {
  let [users, setUsers] = useState(null)
  useEffect(() => {
    let token = localStorage.getItem("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
    axios
      .get("/users", config)
      .then((res) => {
        if (res.data && res.data.results) setUsers(res.data.results)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className="dashboard-content team">
      <div className="main-content">
        <PageHeader>Users</PageHeader>
      </div>
      <div
        className="dashboard-team"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {users &&
          users.map(({ name, dp_path, role, id }) => (
            <User
              name={name}
              dp_path={dp_path}
              defaultDp={defaultDp}
              role={role}
              id={id}
              key={id}
            />
          ))}
      </div>
    </div>
  )
}

export default AllUsers
