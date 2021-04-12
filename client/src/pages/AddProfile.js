import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_DP } from "../graphql/mutations"

const AddProfile = () => {
  const [dp, setDp] = useState(null)
  let [imgData, setImgData] = useState(null)
  const [add_dp, { loading }] = useMutation(ADD_DP, {
    onError(err) {
      console.log(err)
    },
  })
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setDp(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dp && add_dp({ variables: dp })
  }
  return (
    <div>
      Add Profile
      <img src={imgData} alt="" />
      <form onSubmit={(e) => handleSubmit(e)} encType={"multipart/form-data"}>
        <input type="file" onChange={(e) => handleChange(e)} />
        <button disabled={loading}>{loading ? "Wait" : "Upload"}</button>
      </form>
    </div>
  )
}

export default AddProfile
