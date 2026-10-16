'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

function HomeBannerSlider() {
  const slides = [
    {
      id: 1,
      image: '/images/hero-learn-armenian-anywhere.png',
      alt: 'Learn Armenian Anywhere - Live lessons with native teachers',
    },
    {
      id: 2,
      image: '/images/armat-school-events-game-hour.png',
      alt: 'Armat School Events - Interactive Armenian Game Hour',
    },
    {
      id: 3,
      image: '/images/global-armenian-families-map.png',
      alt: 'Trusted by Armenian families in 35+ countries',
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-[500px] md:h-[650px] lg:h-[750px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="w-full h-full my-10">
            <div className="w-full h-full relative">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-contain object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeBannerSlider;