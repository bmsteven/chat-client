import React from "react"
import { BiSearch } from "react-icons/all"
import SearchInput from "../input/SearchInput"

const Search = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="chat-aside-search">
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>
          <BiSearch className="icons" />
        </button>
        <SearchInput placeholder="Search..." handleChange={handleChange} />
      </form>
    </div>
  )
}

export default Search
