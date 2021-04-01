import React, { useState, useLayoutEffect, Suspense, lazy } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { useAuthState } from "../../context/auth"
import { useChatsDispatch } from "../../context/chats"
import { GET_CHATS } from "../../graphql/queries"
import "./chats.sass"

const Aside = lazy(() => import("../../components/chats/Aside"))
const Home = lazy(() => import("./Home"))
const Chat = lazy(() => import("./Chat"))

const Chats = () => {
  const dispatch = useChatsDispatch()
  const { user } = useAuthState()
  const [isMobile, setMobile] = useState(false)
  const [aside, setAside] = useState(true)

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

  useLayoutEffect(() => {
    if (window.screen.width <= 768) {
      setMobile(true)
    }
  }, [setMobile, isMobile])

  useLayoutEffect(() => {
    getChats()
  }, [])
  return (
    <div className="chats-page">
      {loading ? (
        <>Please Wait</>
      ) : (
        <>
          {<Aside />}
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
