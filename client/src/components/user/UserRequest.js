import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useAuthState } from "../../context/auth"

const CHECK_FOLLOWING = gql`
  query checkFollowing($id: Int!) {
    checkFollowing(id: $id)
  }
`

const ACCEPT_CONNECTION = gql`
  mutation acceptConnection($requester: Int!) {
    acceptConnection(requester: $requester) {
      id
    }
  }
`

const REJECT_CONNECTION = gql`
  mutation rejectConnection($requester: Int!) {
    rejectConnection(requester: $requester) {
      id
    }
  }
`

const REQUEST_CONNECTION = gql`
  mutation requestConnection($addressee: Int!) {
    requestConnection(addressee: $addressee) {
      id
    }
  }
`

const FOLLOW = gql`
  mutation follow($id: Int!) {
    follow(id: $id) {
      id
    }
  }
`

const UNFOLLOW = gql`
  mutation unfollow($id: Int!) {
    unfollow(id: $id) {
      id
    }
  }
`

const UserRequest = ({ userData }) => {
  const { id, username, first_name, last_name, title } = userData
  const { user } = useAuthState()

  const [userCheck, setUserCheck] = useState({
    isFollowing: false,
    isConnected: true,
    connectionStatus: "",
  })

  const [followUser, { loading: followLoading }] = useMutation(FOLLOW, {
    onError(err) {
      console.log(err)
    },
    update(_, res) {
      console.log(res)
      if (res) {
        setUserCheck({
          ...userCheck,
          isFollowing: true,
        })
      }
    },
  })

  const [unfollowUser, { loading: unfollowLoading }] = useMutation(UNFOLLOW, {
    onError(err) {
      console.log(err)
    },
    update(_, res) {
      // console.log(res)
      if (res) {
        setUserCheck({
          ...userCheck,
          isFollowing: false,
        })
      }
    },
  })
  const [checkUserFollowing] = useLazyQuery(CHECK_FOLLOWING, {
    onCompleted(res) {
      // console.log(res)
      setUserCheck({ ...userCheck, isFollowing: res.checkFollowing })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [acceptRequest, { loading: connectLoading }] = useMutation(
    ACCEPT_CONNECTION,
    {
      onError(err) {
        console.log(err)
      },
      update(_, res) {
        // console.log(res)
        if (res) {
          console.log(res)
          setUserCheck({
            ...userCheck,
            isConnected: true,
            connectionStatus: "Connected",
          })
        }
      },
    }
  )

  const [rejectRequest, { loading: rejectLoading }] = useMutation(
    REJECT_CONNECTION,
    {
      onError(err) {
        console.log(err)
      },
      update(_, res) {
        console.log(res)
        if (res) {
          // console.log(res)
          setUserCheck({
            ...userCheck,
            isConnected: false,
            connectionStatus: "Not connected",
          })
        }
      },
    }
  )

  const [connectUser, { loading: requestConnectLoading }] = useMutation(
    REQUEST_CONNECTION,
    {
      onError(err) {
        console.log(err)
      },
      update(_, res) {
        // console.log(res)
        setUserCheck({
          ...userCheck,
          isConnected: true,
          connectionStatus: "Request",
        })
      },
    }
  )

  const follow = () => {
    followUser({ variables: { id } })
  }
  const unfollow = () => {
    unfollowUser({ variables: { id } })
  }
  const connect = () => {
    acceptRequest({ variables: { requester: id } })
  }
  const reject = () => {
    rejectRequest({ variables: { requester: id } })
  }

  const request_connect = () => {
    connectUser({ variables: { addressee: id } })
  }

  useEffect(() => {
    checkUserFollowing({ variables: { id } })
  }, [])

  return (
    <div
      style={{
        padding: "1em",
        margin: "2em",
        border: "1px solid gray",
      }}
      key={id}
    >
      <Link to={{ pathname: `/p/${username}`, state: { id } }}>{username}</Link>
      <p>
        {first_name} {last_name}
      </p>
      {title && <p>{title}</p>}
      {user && id !== user.id && (
        <>
          {userCheck.isFollowing ? (
            <button onClick={unfollow} disabled={unfollowLoading}>
              {unfollowLoading ? "Please wait" : "Unfollow"}
            </button>
          ) : (
            <button onClick={follow} disabled={followLoading}>
              {followLoading ? "Please wait" : "Follow"}
            </button>
          )}{" "}
          {connectLoading ? (
            ""
          ) : (
            <>
              {userCheck.isConnected ? (
                <>
                  {userCheck.connectionStatus === "Connected" ? (
                    <p>You are now connected</p>
                  ) : (
                    <>
                      {userCheck.connectionStatus === "Request" ? (
                        <>Request sent</>
                      ) : (
                        <>
                          <button onClick={connect} disabled={connectLoading}>
                            {connectLoading ? "Please wait" : "Accept"}
                          </button>
                          <button onClick={reject} disabled={rejectLoading}>
                            {rejectLoading ? "Please wait" : "Reject"}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={request_connect}
                    disabled={requestConnectLoading}
                  >
                    {requestConnectLoading ? "Please wait" : "Connect"}
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default UserRequest
