import React, { useEffect, useState } from "react"
import { MdClose } from "react-icons/all"
import axios from "axios"

import Food from "../food/Food"
// import Search from "../search/Search"
import "./searchResults.sass"

const SearchResults = ({ keyword, closeSearch }) => {
  let [results, setResults] = useState()
  let [loading, setLoading] = useState(false)
  // let [close, setClose] = useState(false)
  let [formData, setFormData] = useState({
    keyword: keyword ? keyword : "",
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      [name]: value,
    })
    keyword = formData.keyword
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = {
      keyword: formData.keyword,
    }
    setLoading(true)
    axios
      .post("/search", body, config)
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          setResults(res.data)
          //   console.log(results.results)
          setLoading(false)
          // console.log(results.results.results)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const body = {
      keyword: formData.keyword,
    }
    setLoading(true)
    axios
      .post("/search", body, config)
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          setResults(res.data)
          //   console.log(results.results)
          setLoading(false)
          //   console.log(results.results.results)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [setResults, setLoading, keyword])
  return (
    <div className="search-results">
      <div className="search-container">
        <div className="results-container">
          <span className="close">
            <MdClose className="icon" onClick={closeSearch} />
          </span>
          <div className="search">
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="search">
                <input
                  type="text"
                  placeholder="Search through our menu..."
                  id="search"
                  name="keyword"
                  value={formData.keyword}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <button>Search</button>
            </form>
          </div>
          <h2>You Searched For {formData.keyword}</h2>
          {loading ? (
            <h2>Searching...</h2>
          ) : (
            <>
              {results && results.results && (
                <div className="showcase">
                  {results.results.map(
                    ({ name, id, food_image, description, cost }) => (
                      <Food
                        key={id}
                        name={name}
                        id={id}
                        food_image={food_image}
                        description={description}
                        cost={cost}
                      />
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
