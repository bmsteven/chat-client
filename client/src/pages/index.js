import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// components
import Banner from "../components/banner/Banner"
import FeaturedFood from "../components/featured/FeaturedFood"
import MenuBar from "../components/menu/MenuBar"
import FloatHeader from "../components/floatHeader/FloatHeader"
import Footer from "../components/footer/Footer"
import About from "../components/about/About"
import App from "../components/app/App"
import Testimonies from "../components/testimonies/Testimonies"

// imag
import plate from "../assets/images/featured_plate.png"

const Home = () => {
  const [yOffset, setYOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => setYOffset(window.pageYOffset)
    window.addEventListener("scroll", handleScroll, false)
    return () => window.removeEventListener("scroll", handleScroll, false)
  }, [])

  return (
    <div>
      <FloatHeader />
      <Banner>
        <div className="banner__img">
          <img src={plate} alt="" loading="lazy" />
        </div>
        <div className="banner__headline">
          <h1>It's Simple.</h1>
          <p>
            Select your favourite plate from our menu, <br />
            We’ll <span>deliver</span> it to you, <span>FREE DELIVERY!!</span>
          </p>
          <Link to="/menu" className="btn btn-primary">
            Visit our Menu <span>&raquo;</span>
          </Link>
        </div>
      </Banner>
      <FeaturedFood />
      <About />
      <App />
      <Testimonies />
      <Footer />
      <MenuBar />
    </div>
  )
}

export default Home
