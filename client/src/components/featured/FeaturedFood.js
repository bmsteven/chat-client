import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { FoodContext } from "../../context/FoodContext"

import Food from "../food/Food"
import Search from "../search/Search"
import FoodLoader from "../foodLoader/FoodLoader"

import "./featured.sass"

const FeaturedFood = () => {
  let [foods, setFoods] = useContext(FoodContext)

  let data = foods.data
  let featuredFoods

  if (data) featuredFoods = data.filter((o) => o.featured === 1)

  return (
    <section className="featured">
      <div className="container">
        <Search />
        <h2>Explore Our Featured Plates</h2>
        <div className="showcase">
          {foods.loading ? (
            <FoodLoader />
          ) : (
            <>
              {featuredFoods ? (
                <>
                  {featuredFoods.map(
                    ({ name, id, food_image, description, cost, plates }) => (
                      <Food
                        key={id}
                        name={name}
                        id={id}
                        food_image={food_image}
                        description={description}
                        cost={cost}
                        plates={plates}
                      />
                    )
                  )}
                </>
              ) : (
                <></>
              )}
              <div className="more">
                <Link to="/menu">View All</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedFood
