import React, { useState, useLayoutEffect, Suspense } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import PageLoader from "../../components/pageloader/PageLoader"
import { useAuthState } from "../../context/auth"
import { useChatsDispatch, useChatsState } from "../../context/chats"
import Header from "../../components/chats/Header"
import "../../styles/chat.sass"

const UserChat = React.lazy(() => import("../../components/chats/UserChat"))
const Chat = React.lazy(() => import("./Chat"))

const GET_CHATS = gql`
  query getUserChats {
    getUserChats {
      id
      username
      dp
      status
      latestMessage {
        content
        createdAt
      }
    }
  }
`

const Chats = () => {
  const { chats } = useChatsState()
  const dispatch = useChatsDispatch()
  const { user, userLoading } = useAuthState()
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
    getChats()
  }, [])
  return (
    <div>
      {userLoading ? (
        <>Loading</>
      ) : (
        <>
          {user ? (
            <>
              <Header chats={chats} />
              <div
                style={{
                  position: "sticky",
                  top: "0",
                }}
              >
                <h1>Chats</h1>
                <ul>
                  {loading ? (
                    <>Please wait</>
                  ) : (
                    <>
                      {chats && chats.length > 0 ? (
                        <>
                          {chats.map((user) => (
                            <UserChat key={user.id} user={user} />
                          ))}
                        </>
                      ) : (
                        <p>No chats available</p>
                      )}
                    </>
                  )}
                </ul>
              </div>
              <Suspense fallback={<PageLoader />}>
                <Switch>
                  <Route exact path="/chats">
                    Welcome to the chats section
                  </Route>
                  <Route path={`/chats/:slug`} render={() => <Chat />} />
                </Switch>
              </Suspense>
            </>
          ) : (
            <>Unauthorized</>
          )}
        </>
      )}
    </div>
  )
}

export default Chats
