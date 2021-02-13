import React from "react"
import "./loader.sass"

const FoodLoader = () => {
  return (
    <div className="loader-container">
      <div className="food-loader">
        <div className="img-container">
          <span className="loader"></span>
        </div>
        <div className="food-content">
          <h3>
            <span className="loader"></span>
          </h3>
          <p>
            <span className="loader"></span>
          </p>
          <div className="btns">
            <button>
              <span className="loader"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="food-loader">
        <div className="img-container">
          <div className="loader"></div>
        </div>
        <div className="food-content">
          <h3>
            <span className="loader"></span>
          </h3>
          <p>
            <span className="loader"></span>
          </p>
          <div className="btns">
            <button>
              <span className="loader"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="food-loader">
        <div className="img-container">
          <div className="loader"></div>
        </div>
        <div className="food-content">
          <h3>
            <span className="loader"></span>
          </h3>
          <p>
            <span className="loader"></span>
          </p>
          <div className="btns">
            <button>
              <span className="loader"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodLoader
