import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import { useAuthState } from "../../context/auth"

const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      username
      status
      dp
    }
  }
`

const CHECK_CHAT = gql`
  query checkChat($id: Int!) {
    checkChat(id: $id)
  }
`

const Chat = () => {
  const [userData, setUserData] = useState({})
  const { user } = useAuthState()
  let data = useLocation()
  let id = data.state.id
  const [getUserData, { loading: userLoading }] = useLazyQuery(GET_USER, {
    onCompleted(res) {
      setUserData({ ...userData, user: res.getUser })
      console.log(userData.user)
    },
    onError(err) {
      console.log(err)
    },
  })
  const [checkUserChat, { loading: chatLoading }] = useLazyQuery(CHECK_CHAT, {
    onCompleted(res) {
      console.log(res)
      setUserData({
        ...userData,
        active_user: res.checkChat.active_user,
        status: res.checkChat.status,
      })
    },
    onError(err) {
      console.log(err)
    },
  })
  useEffect(() => {
    getUserData({ variables: { id } })
  }, [])
  useEffect(() => {
    checkUserChat({ variables: { id } })
  }, [])
  return (
    <div>
      {userLoading ? (
        <>Wait</>
      ) : (
        <>
          {userData && userData.user && (
            <>
              <h2>{userData.user.username}</h2>
            </>
          )}
        </>
      )}
      {user && id === user.id ? (
        <>Notebook</>
      ) : (
        <>
          {userData.status ? (
            <>You are now connected</>
          ) : (
            <>
              {userData.active_user === user.id && userData.status === false ? (
                <></>
              ) : (
                <>
                  <button>Accept Chat</button> <button>Reject Chat</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Chat
