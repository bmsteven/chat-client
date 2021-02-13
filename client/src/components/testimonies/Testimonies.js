import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination, Navigation } from "swiper"
import { FaQuoteLeft } from "react-icons/all"

import dp1 from "../../assets/images/dp1.jpeg"
import dp2 from "../../assets/images/dp2.jpeg"
import dp3 from "../../assets/images/dp3.jpeg"
import dp4 from "../../assets/images/dp4.jpeg"

import "swiper/swiper.scss"

import "./testimonies.sass"

SwiperCore.use([Pagination, Navigation])

let stories = [
  {
    id: 1,
    name: "Salum Rajab",
    dp: dp1,
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis velit, nibh sit nam odio. Ante nunc mi magnis semper condimentum dui.Lorem ipsum",
  },
  {
    id: 2,
    name: "Veronica Michael",
    dp: dp2,
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis velit, nibh sit nam odio. Ante nunc mi magnis semper condimentum dui.Lorem ipsum",
  },
  {
    id: 3,
    name: "Elineka Maleo",
    dp: dp3,
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis velit, nibh sit nam odio. Ante nunc mi magnis semper condimentum dui.Lorem ipsum",
  },
  {
    id: 4,
    name: "Justine Mahinyila",
    dp: dp4,
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis velit, nibh sit nam odio. Ante nunc mi magnis semper condimentum dui.Lorem ipsum",
  },
  {
    id: 5,
    name: "Jenny McCurthy",
    dp: dp2,
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget duis velit, nibh sit nam odio. Ante nunc mi magnis semper condimentum dui.Lorem ipsum",
  },
]

const Testimonies = () => {
  return (
    <section className="testimonies">
      <div className="intro">
        <h1>What our customers say about our food!</h1>
      </div>
      <div className="stories">
        <div className="showcase">
          <Swiper
            spaceBetween={0}
            grabCursor={true}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {stories.map(({ id, story, name, dp }) => (
              <SwiperSlide key={id}>
                <article className="story">
                  <div className="home-content">
                    <p>
                      <FaQuoteLeft className="icon" />
                      {story}
                    </p>
                    <h3>{name}</h3>
                  </div>
                  <div className="dp">
                    <img src={dp} alt={name} />
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Testimonies
