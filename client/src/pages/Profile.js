import React, { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useAuthState } from "../context/auth"

const USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      username
      bio
      dp
      first_name
      last_name
      location
      title
      about
    }
  }
`

const GET_FOLLOWERS_COUNT = gql`
  query getFollowersCount($id: Int!) {
    getFollowersCount(id: $id)
  }
`

const GET_FOLLOWINGS_COUNT = gql`
  query getFollowingsCount($id: Int!) {
    getFollowingsCount(id: $id)
  }
`

const GET_CONNECTIONS_COUNT = gql`
  query getConnectionsCount($id: Int!) {
    getConnectionsCount(id: $id)
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

const REQUEST_CONNECTION = gql`
  mutation requestConnection($addressee: Int!) {
    requestConnection(addressee: $addressee) {
      id
    }
  }
`
const BLOCK_USER = gql`
  mutation requestConnection($userId: Int!) {
    requestConnection(userId: $userId) {
      id
    }
  }
`

const UBLOCK_USER = gql`
  mutation blockUser($userId: Int!) {
    blockUser(userId: $userId) {
      id
    }
  }
`

const Profile = () => {
  let [userData, setUserData] = useState({})
  const { user } = useAuthState()
  const [userCheck, setUserCheck] = useState({
    isFollowing: false,
    isConnected: false,
    connectionStatus: "",
  })
  let data = useLocation()
  let id = data.state.id
  let [errors, setErrors] = useState({})
  const [getUserData, { loading: userLoading }] = useLazyQuery(USER, {
    onCompleted(res) {
      setUserData({ ...userData, user_info: res.getUser })
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        setErrors({
          user: err.graphQLErrors[0].extensions.msg,
        })
      }
    },
  })
  const [getFollowers] = useLazyQuery(GET_FOLLOWERS_COUNT, {
    onCompleted(res) {
      // console.log(res)
      setUserData({ ...userData, followers: res.getFollowersCount })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [getFollowings] = useLazyQuery(GET_FOLLOWINGS_COUNT, {
    onCompleted(res) {
      // console.log(res)
      setUserData({ ...userData, followings: res.getFollowingsCount })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [getConnections] = useLazyQuery(GET_CONNECTIONS_COUNT, {
    onCompleted(res) {
      // console.log(res)
      setUserData({
        ...userData,
        connections: parseInt(res.getConnectionsCount),
      })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [checkUserConnection, { loading: connectionLoading }] = useLazyQuery(
    CHECK_CONNECTION,
    {
      onCompleted(res) {
        // console.log(res.checkConnection)
        // console.log(userCheck)
        setUserCheck({
          ...userCheck,
          isConnected: res.checkConnection.status,
          connectionStatus: res.checkConnection.status,
        })
      },
      onError(err) {
        console.log(err)
      },
    }
  )
  const [checkUserFollowing] = useLazyQuery(CHECK_FOLLOWING, {
    onCompleted(res) {
      // console.log(res)
      setUserCheck({ ...userCheck, isFollowing: res.checkFollowing })
    },
    onError(err) {
      console.log(err)
    },
  })
  const [followUser, { loading: followLoading }] = useMutation(FOLLOW, {
    onError(err) {
      console.log(err)
    },
    update(_, res) {
      // console.log(res)
      if (res) {
        setUserData({
          ...userData,
          followers: parseInt(userData.followers) + 1,
        })
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
        setUserData({
          ...userData,
          followers: parseInt(userData.followers) - 1,
        })
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
    connectUser({ variables: { addressee: id } })
  }
  useEffect(() => {
    getUserData({ variables: { id } })
  }, [])
  useEffect(() => {
    getFollowers({ variables: { id } })
  }, [])
  useEffect(() => {
    getFollowings({ variables: { id } })
  }, [])
  useEffect(() => {
    getConnections({ variables: { id } })
  }, [])
  useEffect(() => {
    checkUserConnection({ variables: { id } })
  }, [checkUserConnection])
  useEffect(() => {
    checkUserFollowing({ variables: { id } })
  }, [])
  return (
    <div>
      {userLoading ? (
        "Loading"
      ) : (
        <div>
          {errors.user ? (
            <>
              <p>{errors.user}</p>
            </>
          ) : (
            <>
              {userData.user_info && (
                <div>
                  <h1>{userData.user_info.username}</h1>
                  <p>
                    {userData.user_info.first_name}{" "}
                    {userData.user_info.last_name}
                  </p>
                  {userData.user_info.bio && <p>{userData.user_info.bio}</p>}
                  {userData.user_info.about && (
                    <p>{userData.user_info.about}</p>
                  )}
                  {userData.followers === 0 ? (
                    <>0 followers</>
                  ) : (
                    userData.followers > 0 && (
                      <Link
                        to={{
                          pathname: `/followers/${userData.user_info.username}`,
                          state: { id, user: userData.user_info },
                        }}
                      >
                        {userData.followers} followers
                      </Link>
                    )
                  )}{" "}
                  {userData.followings === 0 ? (
                    <>0 followings</>
                  ) : (
                    userData.followings > 0 && (
                      <Link
                        to={{
                          pathname: `/followings/${userData.user_info.username}`,
                          state: { id, user: userData.user_info },
                        }}
                      >
                        {userData.followings} Followings
                      </Link>
                    )
                  )}{" "}
                  {userData.connections === 0 ? (
                    <>0 connections</>
                  ) : (
                    userData.connections > 0 && (
                      <Link
                        to={{
                          pathname: `/connections/${userData.user_info.username}`,
                          state: { id, user: userData.user_info },
                        }}
                      >
                        {userData.connections} Connections
                      </Link>
                    )
                  )}{" "}
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
                      {connectionLoading ? (
                        <></>
                      ) : (
                        <>
                          {userCheck.isConnected === false ? (
                            <>
                              {userCheck.connectionStatus === "B" ? (
                                <button>Unblock</button>
                              ) : (
                                <>
                                  {userCheck.connectionStatus === "A" && (
                                    <button>Block</button>
                                  )}
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
                          <Link
                            to={{
                              pathname: `/chats/${userData.user_info.username}`,
                              state: {
                                id,
                                username: userData.user_info.username,
                                dp: userData.user_info.dp,
                                status: userData.user_info.status,
                              },
                            }}
                          >
                            Message
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Profile

// todo solve follow/unfollow bug
