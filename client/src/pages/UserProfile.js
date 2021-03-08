import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useAuthState } from "../context/auth"
// import { useParams } from "react-router-dom"

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
    checkConnection(id: $id)
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

const UserProfile = () => {
  let [userData, setUserData] = useState({})
  const { user, userLoading } = useAuthState()

  let [errors, setErrors] = useState({})

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

  useEffect(() => {
    if (user) {
      getFollowers({ variables: { id: user.id } })
    }
  }, [])
  useEffect(() => {
    if (user) {
      getFollowings({ variables: { id: user.id } })
    }
  }, [])
  useEffect(() => {
    if (user) {
      getConnections({ variables: { id: user.id } })
    }
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
              {user && (
                <div>
                  <h1>{user.username}</h1>
                  <p>
                    {user.first_name} {user.last_name}
                  </p>
                  {user.bio && <p>{user.bio}</p>}
                  {user.about && <p>{user.about}</p>}
                  {userData.followers === 0 ? (
                    <>0 followers</>
                  ) : (
                    <>
                      {userData.followers > 0 && (
                        <Link
                          to={{
                            pathname: `/followers/${user.username}`,
                            state: { id: user.id, user },
                          }}
                        >
                          {userData.followers} followers
                        </Link>
                      )}
                    </>
                  )}{" "}
                  {userData.followings === 0 ? (
                    <>0 followings</>
                  ) : (
                    userData.followings > 0 && (
                      <Link
                        to={{
                          pathname: `/followings/${user.username}`,
                          state: { id: user.id, user },
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
                          pathname: `/connections/${user.username}`,
                          state: { id: user.id, user },
                        }}
                      >
                        {userData.connections} Connections
                      </Link>
                    )
                  )}{" "}
                </div>
              )}
            </>
          )}
        </div>
      )}
      <Link to="/requests">Connections requests</Link>{" "}
      <Link to="/my-requests">My requests</Link>
    </div>
  )
}

export default UserProfile
