'use client'
import React from 'react'
import '@/styles/Carousel.css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
const Carousel = () => {
  return (
    <div className='w-full'>
      <div id="carouselExampleAutoplaying" className="carousel slide relative" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className='relative w-100 h-[100vh]'>
              <Image
                src="/images/coursel/Thumbnail.jpeg"
                fill
                className="d-block w-full h-full object-cover relative"
                alt="..."
                priority
              />
              <motion.div
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                z-20 text-white flex justify-center flex-col items-center'
              >
                <motion.div
                  className='text-8xl font-display font-light'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "tween", duration: 0.5, ease: "easeOut", delay: 0.8 }}
                >
                  Eventify
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.35 }}
                >
                  A smarter rotaract future!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                >
                  <Link href='/allevent'>
                    <Button className='bg-transparent rounded-full text-white' variant={'outline'}>Explore Events</Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className='absolute inset-0 bg-black/60 pointer-events-none'
                initial={{ right: 0, left: '100%' }}
                animate={{ right: 0, left: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className='relative w-100 h-[100vh]'>
              <Image
                src="/images/coursel/photographer.png"
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
                src="/images/coursel/crowdRegister.png"
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