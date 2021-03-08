import React, { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"

import User from "../components/user/User"

const GET_FOLLOWERS = gql`
  query getFollowers($id: Int!) {
    getFollowers(id: $id) {
      username
      first_name
      last_name
      title
      id
      dp
    }
  }
`

const GET_FOLLOWERS_COUNT = gql`
  query getFollowersCount($id: Int!) {
    getFollowersCount(id: $id)
  }
`

const Followers = () => {
  let data = useLocation()
  let id = data.state.id
  let userData = data.state.user
  let [followers, setFollowers] = useState([])
  let [followersCount, setFollowersCount] = useState()
  let [error, setError] = useState(null)
  const [getUserFollowers, { loading: loadFollowers }] = useLazyQuery(
    GET_FOLLOWERS,
    {
      onCompleted(data) {
        // console.log(data)
        setFollowers(data.getFollowers)
      },
      onError(err) {
        console.log(err)
      },
    }
  )
  const [getUserFollowersCount] = useLazyQuery(GET_FOLLOWERS_COUNT, {
    onCompleted(res) {
      console.log(res)
      setFollowersCount(res.getFollowersCount)
    },
    onError(err) {
      console.log(err)
    },
  })
  useEffect(() => {
    getUserFollowers({ variables: { id } })
  }, [])
  useEffect(() => {
    getUserFollowersCount({ variables: { id } })
  }, [])

  return (
    <div>
      <h2>{userData.username}</h2>
      {followersCount && <h2>{followersCount} followers</h2>}
      {loadFollowers ? (
        "Please wait"
      ) : (
        <>
          {followers && followers.length === 0 ? (
            <>{userData.username} have 0 followers</>
          ) : followers && followers.length > 0 ? (
            <>
              {followers.map((follower) => (
                <User follower={follower} key={follower.username} />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default Followers
