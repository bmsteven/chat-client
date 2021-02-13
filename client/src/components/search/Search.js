import React, { useState } from "react"
import SearchResults from "../searchResults/SearchResults"

import "./search.sass"

const Search = () => {
  let [openSearch, setOpenSearch] = useState(false)
  let [formData, setFormData] = useState({
    keyword: "",
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setOpenSearch(true)
  }
  const closeSearch = () => {
    setOpenSearch(false)
  }
  return (
    <>
      <div className="search">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="search">
            <input
              type="text"
              placeholder="Search through our menu..."
              id="search"
              name="keyword"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button>Search</button>
        </form>
      </div>
      {openSearch && (
        <SearchResults keyword={formData.keyword} closeSearch={closeSearch} />
      )}
    </>
  )
}

export default Search
