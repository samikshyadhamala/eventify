'use client'
import React from 'react'
import '@/styles/Carousel.css'
import Image from 'next/image'
import { motion } from 'framer-motion'  
const Carousel = () => {
  return (
    <div className='w-full'>
      <div id="carouselExampleAutoplaying" className="carousel slide relative" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className='relative w-100 h-[100vh]'>
              <Image 
                src="/images/coursel/Thumbnail.png" 
                fill 
                className="d-block w-full h-full object-cover" 
                alt="..." 
                priority
              />
              <motion.div 
                className='absolute inset-0 bg-black/30 pointer-events-none'
                initial={{ right: 0, left: '100%' }}
                animate={{ right: 0, left: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className='relative w-100 h-[100vh]'>
              <Image 
                src="/images/coursel/Graduation-ceremony.jpg" 
                fill 
                className="d-block w-full h-full object-cover" 
                alt="..." 
                priority
              />
              <motion.div 
                className='absolute inset-0 bg-black/30 pointer-events-none'
                initial={{ right: 0, left: '100%' }}
                animate={{ right: 0, left: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className='relative w-100 h-[100vh]'>
              <Image 
                src="/images/coursel/Microsoft-AI-Fest.jpg" 
                fill 
                className="d-block w-full h-full object-cover" 
                alt="..." 
                priority
              />
              <motion.div 
                className='absolute inset-0 bg-black/30 pointer-events-none'
                initial={{ right: 0, left: '100%' }}
                animate={{ right: 0, left: 0 }}
                transition={{ duration: 0.8, ease: [0.68, -0.6, 0.32, 1.6] }}
              />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev absolute top-0 bottom-0 left-0" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next absolute top-0 bottom-0 right-0" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel