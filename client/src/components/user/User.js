import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useAuthState } from "../../context/auth"

const REQUEST_CONNECTION = gql`
  mutation requestConnection($addressee: Int!) {
    requestConnection(addressee: $addressee) {
      id
    }
  }
`

const CHECK_CONNECTION = gql`
  query checkConnection($id: Int!) {
    checkConnection(id: $id) {
      value
      status
    }
  }
`

const CHECK_FOLLOWING = gql`
  query checkFollowing($id: Int!) {
    checkFollowing(id: $id)
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

const User = ({ follower }) => {
  const { id, username, first_name, last_name, title } = follower
  const { user } = useAuthState()

  const [userCheck, setUserCheck] = useState({
    isFollowing: false,
    isConnected: false,
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
      console.log(res)
      if (res) {
        setUserCheck({
          ...userCheck,
          isFollowing: false,
        })
      }
    },
  })
  const [connectUser, { loading: connectLoading }] = useMutation(
    REQUEST_CONNECTION,
    {
      onError(err) {
        console.log(err)
      },
      update(_, res) {
        console.log(res)
        setUserCheck({
          ...userCheck,
          isConnected: true,
          connectionStatus: "Request",
        })
      },
    }
  )

  const [checkUserConnection] = useLazyQuery(CHECK_CONNECTION, {
    onCompleted(res) {
      console.log(res)
      setUserCheck({
        ...userCheck,
        isConnected: res.checkConnection.status,
        connectionStatus: res.checkConnection.status,
      })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [checkUserFollowing] = useLazyQuery(CHECK_FOLLOWING, {
    onCompleted(res) {
      console.log(res)
      setUserCheck({ ...userCheck, isFollowing: res.checkFollowing })
    },
    onError(err) {
      console.log(err)
    },
  })
  const follow = () => {
    followUser({ variables: { id } })
  }
  const unfollow = () => {
    unfollowUser({ variables: { id } })
  }
  const connect = () => {
    connectUser({ variables: { addressee: id } })
  }
  useEffect(() => {
    checkUserConnection({ variables: { id } })
  }, [])
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
          {userCheck.isConnected ? (
            <>
              {userCheck.connectionStatus === "B" ? (
                <button>Unblock</button>
              ) : (
                <>
                  {userCheck.connectionStatus === "A" && <button>Block</button>}
                  {userCheck.connectionStatus === "Request" && (
                    <p>Requested Connection sent</p>
                  )}
                </>
              )}
            </>
          ) : (
            <button onClick={connect} disabled={connectLoading}>
              {connectLoading ? "Please wait" : "Connect"}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default User
