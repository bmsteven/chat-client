import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useAuthState } from "../../context/auth"
import SendMessage from "../../components/input/SendMessage"
import Message from "../../components/chats/Message"

const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      username
      status
      dp
      cover_image
    }
  }
`

const CHECK_CHAT = gql`
  query checkChat($id: Int!) {
    checkChat(id: $id) {
      status
      active_user
    }
  }
`

const ACCEPT_CHAT = gql`
  mutation acceptChat($id: Int!) {
    acceptChat(id: $id) {
      id
    }
  }
`

const REJECT_CHAT = gql`
  mutation rejectChat($id: Int!) {
    rejectChat(id: $id) {
      id
    }
  }
`

const GET_MESSAGES = gql`
  query getMessages($id: Int!) {
    getMessages(id: $id) {
      id
      content
      senderId
      recipientId
      createdAt
      read_status
      received_status
    }
  }
`

const Chat = () => {
  const [userData, setUserData] = useState({
    status: false,
    active_user: null,
  })
  const { user, userLoading } = useAuthState()
  let [messages, setMessages] = useState([])
  let data = useLocation()
  let { id, username, status, dp } = data.state
  const [getUserData, { loading: userLoader }] = useLazyQuery(GET_USER, {
    onCompleted(res) {
      // console.log(res)
      setUserData({ ...userData, user: res.getUser })
      //   console.log(userData.user)
    },
    onError(err) {
      console.log(err)
    },
  })
  const [getUserMessages, { loading: loadMessages }] = useLazyQuery(
    GET_MESSAGES,
    {
      onCompleted(res) {
        // console.log(res)
        setMessages(res.getMessages)
      },
      onError(err) {
        console.log(err)
      },
    }
  )
  const [checkUserChat, { loading: chatLoading }] = useLazyQuery(CHECK_CHAT, {
    onCompleted(res) {
      // console.log(res)
      // console.log(res)
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

  const getUser = () => {
    getUserData({ variables: { id } })
  }

  const [acceptChat, { loading: acceptLoading }] = useMutation(ACCEPT_CHAT, {
    onCompleted(_, res) {
      // console.log(res)
      setUserData({
        ...userData,
        status: true,
        active_user: user.id,
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  const [rejectChat, { loading: rejectLoading }] = useMutation(REJECT_CHAT, {
    onCompleted(_, res) {
      // console.log(res)
      setUserData({
        ...userData,
        status: false,
      })
    },
    onError(err) {
      console.log(err)
    },
  })

  const acceptUserChat = () => {
    acceptChat({ variables: { id } })
  }

  const rejectUserChat = () => {
    rejectChat({ variables: { id } })
  }

  useEffect(() => {
    checkUserChat({ variables: { id } })
  }, [])
  useEffect(() => {
    getUserMessages({ variables: { id } })
  }, [])
  useEffect(() => {
    window.scrollTo(0, 10000)
  })
  return (
    <div>
      <>
        {username && id && (
          <>
            <Link
              to={{
                pathname: `/p/${username}`,
                state: { id },
              }}
              style={{
                position: "sticky",
                top: "120px",
              }}
            >
              {username}
            </Link>
          </>
        )}
      </>
      {chatLoading ? (
        <></>
      ) : (
        <>
          {messages && messages.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                // flexWrap: "wrap",
                flexDirection: "column-reverse",
                width: "600px",
                maxWidth: "100%",
                margin: "auto",
                background: "#F2F2F2",
                position: "relative",
                marginBottom: "100px",
                bottom: "0",
                padding: "30px",
              }}
            >
              {messages.map((message) => (
                <Message key={message.id} message={message} user={user} />
              ))}
            </div>
          )}
          {userLoading ? (
            <>Please Wait</>
          ) : (
            <>
              {user !== null && id && id === user.id && messages === [] ? (
                <>Notebook</>
              ) : (
                <>
                  {userData.status === true && messages === [] ? (
                    <>You are now connected</>
                  ) : (
                    <>
                      {userData.active_user === user.id &&
                      userData.status === false ? (
                        <></>
                      ) : (
                        <>
                          {userData.status === false &&
                            userData.active_user !== user.id && (
                              <>
                                <button onClick={acceptUserChat}>
                                  Accept Chat
                                </button>{" "}
                                <button onClick={rejectUserChat}>
                                  Reject Chat
                                </button>
                              </>
                            )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {userData &&
              userData.status === false &&
              userData.active_user !== user.id ? (
                <></>
              ) : (
                <>
                  {userData && (
                    <SendMessage
                      id={id}
                      user={user}
                      setMessages={setMessages}
                      messages={messages}
                    />
                  )}
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
