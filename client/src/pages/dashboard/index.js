import React, { useEffect, useState, useContext } from "react"
import { Switch, Route } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

//components
import Header from "../../components/dashboard/header/Header"
import AsideLeft from "../../components/dashboard/aside/AsideLeft"

import Home from "./Home"
import Profile from "./Profile"
// import Food from "./food"
import Foods from "./food/"
import Notifications from "./Notifications"
import Orders from "./Orders"
import Users from "./users/"
import Setting from "./Setting"
import Error from "./Error"

//styles
import "../../styles/pages/dashboard.sass"

const Dashboard = () => {
  // const [user, setUser] = useContext(UserContext)
  const [navOpen, setnavOpen] = useState(true)
  const [isMobile, setMobile] = useState(false)
  const [user, setUser] = useContext(UserContext)
  let [notifications, setNotifications] = useState()

  // console.log(user.loading)

  useEffect(() => {
    if (window.screen.width <= 768) {
      setMobile(true)
    }
  }, [setMobile])

  const handleNav = () => {
    setnavOpen(!navOpen)
  }

  return (
    <div className={navOpen ? "dashboard" : "dashboard dashboard-dark"}>
      {user.loading ? (
        <>Please wait while loading...</>
      ) : (
        <>
          {user.data &&
          (user.data.role === "admin" || user.data.role === "main-admin") ? (
            <Route
              render={({ location }) => (
                <div className="page-content">
                  <>
                    <Header
                      navOpen={navOpen}
                      handleNav={handleNav}
                      notifications={notifications}
                      setNotifications={setNotifications}
                    />
                    <AsideLeft
                      asideOpen={navOpen ? "" : "side-nav-open"}
                      isMobile={isMobile}
                      setnavOpen={setnavOpen}
                      notifications={notifications}
                    />
                    {isMobile && (
                      <div
                        className={!navOpen ? "backdrop" : ""}
                        onClick={() => setnavOpen(true)}
                      ></div>
                    )}
                    <Switch location={location} key={location.pathname}>
                      <Route exact path={`/dashboard/`} key={`Home`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Home />
                        </main>
                      </Route>
                      <Route exact path={`/dashboard/profile`} key={`Home`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Profile />
                        </main>
                      </Route>
                      <Route path={`/dashboard/food`} key={`Foods`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Foods />
                        </main>
                      </Route>
                      <Route exact path={`/dashboard/orders`} key={`orders`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Orders />
                        </main>
                      </Route>
                      <Route
                        exact
                        path={`/dashboard/notifications`}
                        key={`notifications`}
                      >
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Notifications notifications={notifications} />
                        </main>
                      </Route>
                      <Route path={`/dashboard/users`} key={`team`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Users />
                        </main>
                      </Route>
                      <Route exact path={`/dashboard/setting`} key={`Setting`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Setting />
                        </main>
                      </Route>
                      <Route key={`Error`}>
                        <main className={navOpen ? "main" : "main full-width"}>
                          <Error />
                        </main>
                      </Route>
                    </Switch>
                  </>
                </div>
              )}
            />
          ) : (
            <>Your are not an admin, don't know where to go?</>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
