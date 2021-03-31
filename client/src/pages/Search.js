import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery } from "@apollo/client"
import Input from "../components/input/Input"

const SEARCH = gql`
  query searchProfile($keyword: String!) {
    searchProfile(keyword: $keyword) {
      id
      username
      bio
      dp
      first_name
      last_name
      location
      title
    }
  }
`

const Search = () => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const slug = params.get("q")
  let [keyword, setKeyword] = useState(slug)
  let [results, setResults] = useState([])
  let [error, setError] = useState(null)
  const [searchProfiles, { loading }] = useLazyQuery(SEARCH, {
    onCompleted(res) {
      setResults(res.searchProfile)
      setError(null)
    },
    onError(err) {
      console.log(err)
      setError("Something went wrong")
    },
  })
  const handleChange = (e) => {
    setKeyword(e.target.value)
    searchProfiles({
      variables: { keyword },
    })
    setError(null)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    searchProfiles({
      variables: { keyword },
    })
  }
  useEffect(() => {
    searchProfiles({
      variables: { keyword },
    })
  }, [])

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          placeholder="Search profiles"
          name="keyword"
          handleChange={handleChange}
        />
      </form>
      <p>you searched for {keyword}</p>
      {loading ? (
        "loading..."
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              {results && results.length === 0 ? (
                <p>Profiles with {keyword} keyword do not exists</p>
              ) : (
                <>
                  {results.map(
                    ({
                      username,
                      first_name,
                      last_name,
                      location,
                      title,
                      id,
                    }) => (
                      <div
                        key={username}
                        style={{
                          padding: "1em",
                          margin: "2em",
                          border: "1px solid gray",
                        }}
                      >
                        <Link
                          to={{ pathname: `/p/${username}`, state: { id } }}
                        >
                          {username}
                        </Link>
                        <p>
                          {first_name} {last_name}
                        </p>
                        {title && <p>{title}</p>}
                        {location && <p>{location}</p>}
                      </div>
                    )
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

export default Search
