'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { EffectFade, Pagination } from 'swiper/modules';
const Hero = ({
  title1,
  description,
  button,
  image,
  height,
  alt,
  link,
  arrowLeft,
  arrowRight,
}) => {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Reset videos on slide change
    if (!swiperRef.current) return;

    swiperRef.current.on('slideChange', () => {
      videoRefs.current.forEach((video, i) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });

      const activeIndex = swiperRef.current.activeIndex;
      const video = videoRefs.current[activeIndex];
      if (video) video.play();
    });
  }, []);
  return (
    <div>
      <div className='bg-black text-white'>
        {/* Hero Section */}
        <div
          className={`relative  ${
            height ? 'h-[120vh] max-sm:h-[70vh]' : 'h-[100vh] max-sm:h-[60vh]'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-custom-next',
              prevEl: '.swiper-custom-prev',
            }}
            // pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className='w-full h-full relative'
          >
            {image.map((img, idx) => (
              <SwiperSlide key={idx}>
                {img.type === 'video' ? (
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    className='absolute inset-0 w-full h-full object-cover'
                    src={img.value}
                    muted
                    playsInline
                    autoPlay
                    loop={true}
                    onEnded={() => {
                      const swiper = swiperRef.current;
                      if (!swiper) return;
                      if (idx === image.length - 1) {
                        swiper.slideTo(0);
                      } else {
                        swiper.slideNext();
                      }
                    }}
                  />
                ) : (
                  <Image
                    src={img.value}
                    alt={alt || 'Hero Background'}
                    layout='fill'
                    objectFit='cover'
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                )}
              </SwiperSlide>
            ))}

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 to-black/0 z-10' />

            {/* Custom Arrows */}
            {arrowLeft && (
              <div className='swiper-custom-prev absolute max-sm:left-0 left-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer'>
                <FaArrowLeft className='text-2xl' />
              </div>
            )}
            {arrowRight && (
              
              <div className='swiper-custom-next absolute max-sm:right-0 right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer'>
              <FaArrowRight className='text-2xl' />
            </div>
            )}
          </Swiper>

          {/* Content */}
          <div className=' absolute top-0 z-10 mx-3 sm:mx-6 lg:mx-20 h-full flex items-center'>
            <motion.div
              className='pt-28'
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <div>
                <h1 className=' max-sm:text-center max-sm:max-w-[342px] max-w-[820px] lg:leading-[80px] md:leading-[70px] max-sm:leading-[38px] text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 sm:mb-10'>
                  {title1}
                </h1>
                <p className='text-lg max-sm:text-center sm:text-2xl text-gray-300 mb-8'>
                  {description}
                </p>
                <a href={link} target='_blank'>
                  {button && (
                    <button
                      className='w-40 py-2 duration-300 transition-all text-white
           bg-gradient-to-r from-[#69CCF6] to-blue-600
           hover:bg-white hover:text-black 
           hover:from-transparent hover:to-transparent'
                    >
                      {button}
                    </button>
                  )}
                </a>
              </div>
            </motion.div>
          </div>
          <>
            <style>{`
          .swiper-pagination {
            bottom: 16px !important;
          }
          .swiper-pagination-bullet {
            width: 14px;
            height: 14px;
            background: black;
            opacity: 1;
            margin: 0 6px;
          }
          .swiper-pagination-bullet-active {
            background: red !important;
          }
        `}</style>
          </>
        </div>
      </div>
    </div>
  );
};

export default Hero;
