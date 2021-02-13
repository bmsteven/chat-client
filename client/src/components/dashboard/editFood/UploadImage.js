import React, { useState } from "react"
import { AiOutlineCloudUpload } from "react-icons/all"

const UploadImage = ({ image }) => {
  let [loading, setLoading] = useState(false)
  let [food_image, setFood_Image] = useState(image ? image : "")

  const handleImgChange = (e) => {
    if (e.target.files) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setFood_Image(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleImageSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={(e) => handleImageSubmit(e)}>
      <div className="image-upload">
        <label htmlFor="image">Update Food Image:</label>
        <input
          type="file"
          name="food_image"
          id="image"
          onChange={(e) => handleImgChange(e)}
        />
        <label htmlFor="image" className="placeholder">
          {food_image ? (
            <img src={food_image} alt="" />
          ) : (
            <div>
              <AiOutlineCloudUpload className="icon" />
            </div>
          )}
        </label>
      </div>
      <div className="btns">
        <button disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  )
}

export default UploadImage
