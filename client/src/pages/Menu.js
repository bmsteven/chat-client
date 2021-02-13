import React, { useContext } from "react"
import { FoodContext } from "../context/FoodContext"

// components
import Banner from "../components/banner/Banner"
import Food from "../components/food/Food"
import Search from "../components/search/Search"
import MenuBar from "../components/menu/MenuBar"
import FloatHeader from "../components/floatHeader/FloatHeader"
import FoodLoader from "../components/foodLoader/FoodLoader"

import "../styles/pages/menu.sass"

const Menu = () => {
  const [foods, setFoods] = useContext(FoodContext)
  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>Our Menu</h1>
        </div>
      </Banner>
      <div className="food-showcase">
        <div className="container">
          <Search />
          <div className="showcase">
            {foods.loading ? (
              <FoodLoader />
            ) : (
              <>
                {foods &&
                  foods.data &&
                  foods.data.map(
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
            )}
          </div>
        </div>
      </div>
      <MenuBar />
    </div>
  )
}

export default Menu
