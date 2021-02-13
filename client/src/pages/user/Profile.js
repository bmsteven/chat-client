import React, { useContext } from "react"
import Banner from "../../components/banner/Banner"
import { UserContext } from "../../context/UserContext"

import UserProfile from "../../components/userProfile/UserProfile"
import MenuBar from "../../components/menu/MenuBar"
import FloatHeader from "../../components/floatHeader/FloatHeader"

const Profile = () => {
  let [user, setUser] = useContext(UserContext)
  let Name
  if (user && user.data) {
    Name = user.data.name.split(" ")[0]
  }
  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>{user && user.data && Name}</h1>
        </div>
      </Banner>
      <div className="profile-container">
        {user.data && (
          <UserProfile
            name={user.data.name}
            email={user.data.email}
            dp={user.data.dp_path}
            tel={user.data.tel}
            location={user.data.location}
            address={user.data.address}
          />
        )}
      </div>
      <MenuBar />
    </div>
  )
}

export default Profile
