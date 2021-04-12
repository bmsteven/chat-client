import React, { useState, useLayoutEffect, Suspense, lazy } from "react"
import { Switch, Route } from "react-router-dom"
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client"
import { useAuthState } from "../../context/auth"
import { useChatsDispatch } from "../../context/chats"
import { GET_CHATS } from "../../graphql/queries"
import { UPDATE_LAST_SEEN } from "../../graphql/mutations"
import { NEW_ONLINE_USER } from "../../graphql/subscriptions"
import "./chats.sass"

const Aside = lazy(() => import("../../components/chats/Aside"))
const Home = lazy(() => import("./Home"))
const Chat = lazy(() => import("./Chat"))

const Chats = () => {
  const dispatch = useChatsDispatch()
  const { user } = useAuthState()
  const [isMobile, setMobile] = useState(false)
  const [onlineIndicator, setOnlineIndicator] = useState(0)
  const { data: userLastSeen } = useSubscription(NEW_ONLINE_USER)
  const [getChats, { loading }] = useLazyQuery(GET_CHATS, {
    onCompleted(res) {
      dispatch({
        type: "LOAD_CHATS",
        payload: res.getUserChats,
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  const [updateLastSeen] = useMutation(UPDATE_LAST_SEEN)

  useLayoutEffect(() => {
    if (window.screen.width <= 768) {
      setMobile(true)
    }
  }, [setMobile, isMobile])

  useLayoutEffect(() => {
    getChats()
  }, [])

  useLayoutEffect(() => {
    if (userLastSeen) {
      dispatch({
        type: "LOAD_ONLINE_USER",
        payload: userLastSeen,
      })
    }
  }, [userLastSeen])

  useLayoutEffect(() => {
    updateLastSeen({ variables: { now: new Date().toISOString() } })
    setOnlineIndicator(
      setInterval(
        () => updateLastSeen({ variables: { now: new Date().toISOString() } }),
        30000
      )
    )
    return () => clearInterval(onlineIndicator)
  }, [])
  return (
    <div className="chats-page">
      {loading ? (
        <>Please Wait</>
      ) : (
        <>
          {<Aside user={user} />}
          <Switch>
            <Route exact path="/chats" render={() => <Home />} />
            <Route path="/chats/:username" render={() => <Chat />} />
          </Switch>
        </>
      )}
    </div>
  )
}

export default Chats
