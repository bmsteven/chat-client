import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

import axios from "axios"

import "./user.sass"

const User = ({ dp_path, name, id, role, defaultDp }) => {
  let [user, setUser] = useContext(UserContext)
  let token = localStorage.getItem("token")
  // console.log(token)
  let config = {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }

  const addAdmin = (id) => {
    if (token)
      axios
        .post(`/add-admin/${id}`, config)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }

  const removeAdmin = (id) => {
    axios
      .post(`remove-admin/${id}`, config)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="user">
      <div className="user__container">
        <div className="user__dp">
          <img src={dp_path ? dp_path : defaultDp} alt={name} />
        </div>
        <div className="user__name">
          <h3>{name}</h3>
        </div>
        <div className="user__role">
          <p>{role ? role : "Customer"}</p>
        </div>
        {user.data && user.data.role === "main-admin" && (
          <div className="user__auth">
            {role === "admin" ? (
              <button onClick={() => removeAdmin(id)}>Remove Admin</button>
            ) : (
              <>
                {role === "main-admin" ? (
                  ""
                ) : (
                  <button onClick={() => addAdmin(id)}>Add Admin</button>
                )}
              </>
            )}
          </div>
        )}
        {user.data &&
          (user.data.role === "admin" || user.data.role === "main-admin") && (
            <div className="user__auth">
              <Link to={{ pathname: `/dashboard/users/orders`, state: { id } }}>
                View Orders
              </Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default User
