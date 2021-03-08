import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"

import UserChat from "../../components/chats/UserChat"
import Chat from "./Chat"

const GET_CHATS = gql`
  query getUserChats {
    getUserChats {
      id
      username
    }
  }
`

const Chats = () => {
  const [chats, setChats] = useState([])
  const [getChats, { loading }] = useLazyQuery(GET_CHATS, {
    onCompleted(res) {
      console.log(res)
      setChats(res.getUserChats)
    },
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    getChats()
  }, [])
  return (
    <div>
      <div>
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
                <>No chats available</>
              )}
            </>
          )}
        </ul>
      </div>
      <Switch>
        <Route exact path="/chats">
          Chats
        </Route>
        <Route exact path="/chats/:slug">
          <Chat />
        </Route>
      </Switch>
    </div>
  )
}

export default Chats
