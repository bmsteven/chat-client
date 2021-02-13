import React, { useState, useEffect } from "react"
import axios from "axios"

import "./editFood.sass"
import UploadImage from "./UploadImage"

const EditFoodForm = ({ foodToEdit, foodLoading }) => {
  let [loading, setLoading] = useState(false)
  // console.log(foodToEdit)
  let [formData, setFormData] = useState({
    Name: foodToEdit ? foodToEdit[0].name : "",
    description: foodToEdit ? foodToEdit[0].description : "",
    cost: foodToEdit ? foodToEdit[0].cost : "",
    featured: foodToEdit ? foodToEdit[0].featured : "",
    plates: foodToEdit ? foodToEdit[0].plates : "",
  })

  const { Name, description, category, cost, featured, plates } = formData

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
      category: foodToEdit && foodToEdit[0].category,
      cost,
      featured,
      plates,
    }
    axios
      .post(`/update-food/${foodToEdit[0].id}`, body, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <div className="edit-food">
      {foodLoading ? (
        <>Loading...</>
      ) : (
        <>
          {foodToEdit && foodToEdit.length > 0 ? (
            <div className="new-food">
              <div className="container">
                <UploadImage image={foodToEdit && foodToEdit[0].food_image} />
                <form onSubmit={(e) => handleSubmit(e)}>
                  <h2>Edit basic food informations</h2>
                  <div className="input-group">
                    <label htmlFor="name">Food Name:</label>
                    <input
                      type="text"
                      name="Name"
                      id="name"
                      value={Name}
                      onChange={(e) => handleChange(e)}
                      placeholder="Food Name"
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="descriptions">Food Description:</label>
                    <textarea
                      name="description"
                      id="descriptions"
                      value={description}
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
                      value={cost}
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
                      value={plates && plates}
                      onChange={(e) => handleChange(e)}
                      placeholder="Available plates..."
                    />
                  </div>
                  <label htmlFor="featured" className="featured">
                    <input
                      type="checkbox"
                      name="featured"
                      id="featured"
                      onChange={(e) => handleChange(e)}
                      value={1}
                      defaultChecked={featured}
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
          ) : (
            "Food Not Found"
          )}
        </>
      )}
    </div>
  )
}

export default EditFoodForm
