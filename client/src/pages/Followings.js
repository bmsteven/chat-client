import React, { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"

import User from "../components/user/User"

const GET_FOLLOWINGS = gql`
  query getFollowings($id: Int!) {
    getFollowings(id: $id) {
      username
      first_name
      last_name
      title
      id
      dp
    }
  }
`

const GET_FOLLOWINGS_COUNT = gql`
  query getFollowingsCount($id: Int!) {
    getFollowingsCount(id: $id)
  }
`

const Followings = () => {
  let data = useLocation()
  let id = data.state.id
  let userData = data.state.user
  let [followings, setFollowings] = useState([])
  let [followingsCount, setFollowingsCount] = useState()
  let [error, setError] = useState(null)
  const [getUserFollowings, { loading: loadFollowings }] = useLazyQuery(
    GET_FOLLOWINGS,
    {
      onCompleted(data) {
        // console.log(data)
        setFollowings(data.getFollowings)
      },
      onError(err) {
        console.log(err)
      },
    }
  )
  const [getUserFollowingsCount] = useLazyQuery(GET_FOLLOWINGS_COUNT, {
    onCompleted(res) {
      console.log(res)
      setFollowingsCount(res.getFollowingsCount)
    },
    onError(err) {
      console.log(err)
    },
  })
  useEffect(() => {
    getUserFollowings({ variables: { id } })
  }, [])
  useEffect(() => {
    getUserFollowingsCount({ variables: { id } })
  }, [])

  return (
    <div>
      <h2>{userData.username}</h2>
      {followingsCount && <h2>{followingsCount} followings</h2>}
      {loadFollowings ? (
        "Please wait"
      ) : (
        <>
          {followings && followings.length === 0 ? (
            <>{userData.username} have 0 followers</>
          ) : followings && followings.length > 0 ? (
            <>
              {followings.map((following) => (
                <User follower={following} key={following.username} />
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

export default Followings
