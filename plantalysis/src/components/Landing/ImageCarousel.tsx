/* eslint-disable react/jsx-key */
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import './../assets/css/imageCarousel.css'
import C1 from '../assets/img/img1.png'
import C2 from '../assets/img/img2.png'
import C3 from '../assets/img/img3.png'

import { Autoplay, Pagination } from 'swiper/modules'

const images = [
  {
    src: C1,
  },
  {
    src: C2,
  },
  {
    src: C3,
  },
]

const slideStyle: React.CSSProperties = {
  width: '60%',
}

const imageStyle: React.CSSProperties = {
  borderRadius: '20px',
}

export default function ImageCarousel() {
  return (
    <>
      <Swiper
        // @ts-ignore
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="image-carousel"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        initialSlide={1} // Set the initial slide index to 1 (second image)
      >
        {images.map(({ src }, index) => (
          <SwiperSlide style={slideStyle} key={index}>
            <img src={src} style={imageStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
