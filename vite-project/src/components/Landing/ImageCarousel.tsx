import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'
import 'swiper/css/pagination'

import './../assets/css/imageCarousel.css'

import { Autoplay, Pagination } from 'swiper/modules'

const images = [
    { src: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' },
    { src: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' },
    { src: 'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg' },
]

const slideStyle: React.CSSProperties = {
    width: '60%'
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
                    disableOnInteraction: false
                }}
            >
                {
                    images.map(({ src }) => <SwiperSlide style={slideStyle}>
                        <img src={src} />
                    </SwiperSlide>)
                }
            </Swiper>
        </>
    )
}