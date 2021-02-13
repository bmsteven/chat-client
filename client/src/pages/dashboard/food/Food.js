import React, { useContext } from "react"
import { FoodContext } from "../../../context/FoodContext"
import { Link } from "react-router-dom"

// components
import PageHeader from "../../../components/dashboard/PageHeader"
import FoodCard from "../../../components/dashboard/Food"
import FoodLoader from "../../../components/foodLoader/FoodLoader"
import "../../../styles/pages/foods.sass"

const Food = () => {
  let [foods, setFoods] = useContext(FoodContext)

  return (
    <div className="dashboard-content foods">
      <div className="main-content">
        <PageHeader>Foods</PageHeader>
        <div className="dashboard-foods">
          <div>
            <div className="foods">
              <div className="top">
                <Link to="/dashboard/food/new">Add New Food</Link>
              </div>
              <div className="showcase">
                {foods.loading ? (
                  <FoodLoader />
                ) : (
                  <>
                    {foods.data &&
                      foods.data.map(
                        ({
                          name,
                          id,
                          food_image,
                          description,
                          cost,
                          plates,
                        }) => (
                          <FoodCard
                            name={name}
                            id={id}
                            food_image={food_image}
                            description={description}
                            cost={cost}
                            plates={plates}
                            key={id}
                          />
                        )
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Food
