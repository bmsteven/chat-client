import React from "react"
import Banner from "../../components/banner/Banner"

import MenuBar from "../../components/menu/MenuBar"
import FloatHeader from "../../components/floatHeader/FloatHeader"
import Footer from "../../components/footer/Footer"

const Favourites = () => {
  return (
    <div className="menu">
      <FloatHeader />
      <Banner>
        <div className="banner__headline">
          <h1>My Favourite Plates</h1>
        </div>
      </Banner>
      <Footer />
      <MenuBar />
    </div>
  )
}

export default Favourites
