import React, { lazy } from "react"
import { useChatsState } from "../../context/chats"
import { useAuthState } from "../../context/auth"
import "./layout.sass"
const Header = lazy(() => import("./Header"))
const OnlineUser = lazy(() => import("./OnlineUser"))

const Layout = ({ page, username, children }) => {
  let { users } = useChatsState()
  const { user } = useAuthState()
  // console.log("====================================")
  // console.log(users)
  // console.log("====================================")
  let authUsername = user.username
  return (
    <div className="chat-layout">
      <Header page={page} username={username} />
      <main>
        {children}
        <div className="aside-contents">
          <div className="active-connections">
            <h3>Active users</h3>
            {users?.length > 0 &&
              users.map((user) => (
                <OnlineUser key={user.id} user={user} username={authUsername} />
              ))}
          </div>
          {/* <div className="all-connections">
            <h3>Your Network</h3>
          </div> */}
        </div>
      </main>
    </div>
  )
}

export default Layout
