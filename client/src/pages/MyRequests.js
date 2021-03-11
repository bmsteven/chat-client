import React, { useEffect, useState } from "react"
import { gql, useLazyQuery } from "@apollo/client"

import MyRequest from "../components/user/MyRequest"

const GET_MY_REQUESTS = gql`
  query getUserConnectionRequests {
    getUserConnectionRequests {
      id
      username
      first_name
      last_name
      title
    }
  }
`

const MyRequests = () => {
  let [requests, setRequests] = useState([])
  const [getRequests, { loading }] = useLazyQuery(GET_MY_REQUESTS, {
    onCompleted(res) {
      // console.log(res)
      setRequests(res.getUserConnectionRequests)
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
              <h2>My requests</h2>
              {requests.map((userData) => (
                <MyRequest userData={userData} key={userData.id} />
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

export default MyRequests
