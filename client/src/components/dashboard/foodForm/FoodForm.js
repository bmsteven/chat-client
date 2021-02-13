import React, { useState, useContext } from "react"
import { AiOutlineCloudUpload } from "react-icons/all"
import axios from "axios"
import { FoodContext } from "../../../context/FoodContext"

import "./foodForm.sass"

const FoodForm = ({ setClose, food }) => {
  let [food_image, setFood_Image] = useState(null)
  let [loading, setLoading] = useState(false)
  let [imgData, setImgData] = useState(null)
  let [foods, setFoods] = useContext(FoodContext)
  let [formData, setFormData] = useState({
    Name: "",
    description: "",
    category: [],
    cost: "",
    featured: 0,
    plates: 0,
  })
  const { Name, description, category, cost, featured, plates } = formData

  const handleImgChange = (e) => {
    if (e.target.files) {
      // setFood_Image(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
        setFood_Image(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
      // console.log(dp, imgData)
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  const handleCheckBoxChange = async (e) => {
    let checkedItem = formData.category
    if (e.target.checked) {
      checkedItem.push(e.target.value)
    } else {
      checkedItem.remove(checkedItem, (obj) => {
        return obj === e.target.value
      })
    }
    setFormData({ ...formData, category: checkedItem })
    console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let token = localStorage.getItem("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
    let body = {
      name: Name,
      description,
      category,
      cost,
      featured,
      food_image,
      plates,
    }
    axios
      .post("/add-food", body, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        setFoods({
          ...foods,
        })
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div className="new-food">
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="image-upload">
            <label htmlFor="image">Upload Food Image:</label>
            <input
              type="file"
              name="food_image"
              id="image"
              onChange={(e) => handleImgChange(e)}
            />
            <label htmlFor="image" className="placeholder">
              {imgData ? (
                <img src={imgData} alt="" />
              ) : (
                <div>
                  <AiOutlineCloudUpload className="icon" />
                </div>
              )}
            </label>
          </div>
          <h2>Add basic food informations</h2>
          <div className="input-group">
            <label htmlFor="name">Food Name:</label>
            <input
              type="text"
              name="Name"
              id="name"
              onChange={(e) => handleChange(e)}
              placeholder="Food Name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="descriptions">Food Description:</label>
            <textarea
              name="description"
              id="descriptions"
              onChange={(e) => handleChange(e)}
              placeholder="place food description here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="cost">Food Price in Tshs:</label>
            <input
              type="number"
              name="cost"
              id="cost"
              onChange={(e) => handleChange(e)}
              placeholder="Price..."
            />
          </div>
          <div className="input-group">
            <label htmlFor="cplates">Available plates:</label>
            <input
              type="number"
              name="plates"
              id="plates"
              onChange={(e) => handleChange(e)}
              placeholder="Available plates..."
            />
          </div>
          <h3>Select Categories</h3>
          <div className="checkbox-group">
            <label htmlFor="vegetables">
              <input
                type="checkbox"
                name="category"
                id="vegetables"
                value="Vegetables"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Vegetables
            </label>
            <label htmlFor="salad">
              <input
                type="checkbox"
                name="category"
                id="salad"
                value="Salads"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Salads
            </label>
            <label htmlFor="cake">
              <input
                type="checkbox"
                name="category"
                id="cake"
                value="Cake"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Cake
            </label>
            <label htmlFor="chicken">
              <input
                type="checkbox"
                name="category"
                id="chicken"
                value="Chicken"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Chicken
            </label>
            <label htmlFor="cereals">
              <input
                type="checkbox"
                name="category"
                id="cereals"
                value="Cereals"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Cereals
            </label>
            <label htmlFor="fruits">
              <input
                type="checkbox"
                name="category"
                id="fruits"
                value="Fruits"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Fruits
            </label>
            <label htmlFor="steak">
              <input
                type="checkbox"
                name="category"
                id="steak"
                value="Steak"
                onChange={(e) => handleCheckBoxChange(e)}
              />
              Steak
            </label>
          </div>
          <label htmlFor="featured" className="featured">
            <input
              type="radio"
              name="featured"
              id="featured"
              onChange={(e) => handleChange(e)}
              value={1}
            />
            Add this food to featured list
          </label>
          <div className="btns">
            <button disabled={loading} className="btn btn-primary">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodForm
