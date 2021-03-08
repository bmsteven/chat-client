import React, { useEffect, useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"

import UserRequest from "../components/user/UserRequest"

const GET_CONNECTIONS_REQUESTS = gql`
  query getConnectionRequests {
    getConnectionRequests {
      id
      username
      first_name
      last_name
      title
    }
  }
`

const ConnectionsRequests = () => {
  let [requests, setRequests] = useState([])
  const [getRequests, { loading }] = useLazyQuery(GET_CONNECTIONS_REQUESTS, {
    onCompleted(res) {
      // console.log(res)
      setRequests(res.getConnectionRequests)
    },
    onError(err) {
      console.log(err)
    },
  })

  useEffect(() => {
    getRequests()
  }, [])
  return (
    <div>
      {loading ? (
        <>Please wait</>
      ) : (
        <>
          {requests && requests.length > 0 ? (
            <>
              <h2>{requests.length} requests</h2>
              {requests.map((userData) => (
                <UserRequest userData={userData} />
              ))}
            </>
          ) : (
            <>No requests available</>
          )}
        </>
      )}
    </div>
  )
}

export default ConnectionsRequests
