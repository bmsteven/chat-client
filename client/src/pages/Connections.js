import React, { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"

import User from "../components/user/User"

const GET_CONNECTIONS = gql`
  query getConnections($id: Int!) {
    getConnections(id: $id) {
      username
      first_name
      last_name
      title
      id
      dp
    }
  }
`

const GET_CONNECTIONS_COUNT = gql`
  query getConnectionsCount($id: Int!) {
    getConnectionsCount(id: $id)
  }
`

const Connections = () => {
  let data = useLocation()
  let id = data.state.id
  let userData = data.state.user
  let [connections, setConnections] = useState([])
  let [connectionsCount, setConnectionsCount] = useState()
  let [error, setError] = useState(null)
  const [getUserConnections, { loading: loadConnections }] = useLazyQuery(
    GET_CONNECTIONS,
    {
      onCompleted(data) {
        // console.log(data)
        setConnections(data.getConnections)
      },
      onError(err) {
        console.log(err)
      },
    }
  )
  const [getUserConnectionsCount] = useLazyQuery(GET_CONNECTIONS_COUNT, {
    onCompleted(res) {
      // console.log(res)
      setConnectionsCount(res.getConnectionsCount)
    },
    onError(err) {
      console.log(err)
    },
  })
  useEffect(() => {
    getUserConnections({ variables: { id } })
  }, [])
  useEffect(() => {
    getUserConnectionsCount({ variables: { id } })
  }, [])

  return (
    <div>
      <h2>{userData.username}</h2>
      {connectionsCount && <h2>{connectionsCount} connections</h2>}
      {loadConnections ? (
        "Please wait"
      ) : (
        <>
          {connections && connections.length === 0 ? (
            <>{userData.username} have 0 followers</>
          ) : connections && connections.length > 0 ? (
            <>
              {connections.map((connection) => (
                <User follower={connection} key={connection.username} />
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

export default Connections
