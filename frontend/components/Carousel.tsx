'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/Carousel.css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isAnimating, setIsAnimating] = useState(false)

  const slides = [
    {
      image: "/images/coursel/Thumbnail.jpeg",
      title: "Eventify",
      subtitle: "A smarter rotaract future!",
      cta: "Explore Events",
      link: "/allevent"
    },
    {
      image: "/images/coursel/photographer.png",
      title: "Capture Moments",
      subtitle: "Professional event photography",
      cta: "Learn More",
      link: "/allevent"
    },
    {
      image: "/images/coursel/crowdRegister.png",
      title: "Join The Community",
      subtitle: "Register for upcoming events",
      cta: "Register Now",
      link: "/allevent"
    }
  ]

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    // Allow animations to complete before enabling controls again
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    // Allow animations to complete before enabling controls again
    setTimeout(() => setIsAnimating(false), 1000)
  }

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 9000)

    return () => clearInterval(interval)
  }, [])

  // Variants for animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      // opacity: 0
    })
  }

  // Dynamic overlay colors for each slide
  const overlayColors = [
    "from-sky-300/50 to-indigo-500/40",
    "from-amber-800/60 to-stone-900/70", // Warm indoor environment with yellow lights for second slide
    "from-orange-900/70 to-black/60", // Outdoor with open sky for third slide
  ]

  // Advanced overlay animation variants
  const overlayVariants = {
    initial: (direction) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0
    }),
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeIn"
      }
    })
  }

  // Secondary overlay for additional effect
  const secondaryOverlayVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "circOut",
        delay: 0.2
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "circIn"
      }
    })
  }

  const textVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.2 + 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: (custom) => ({
      y: -20,
      opacity: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeIn"
      }
    })
  }

  return (
    <div className='w-full h-[100vh] overflow-hidden relative'>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          className="relative w-full h-full"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
        >
          {/* Image */}
          <Image
            src={slides[currentSlide].image}
            fill
            className="object-cover"
            alt={slides[currentSlide].title}
            priority
          />

          {/* Dynamic Overlay System */}
          <AnimatePresence mode="wait">
            {/* Primary Gradient Overlay with Vertical Motion */}
            <motion.div
              key={`primary-overlay-${currentSlide}`}
              className={`absolute inset-0 bg-gradient-to-b ${overlayColors[currentSlide]} pointer-events-none`}
              custom={direction}
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            {/* Secondary Diagonal Overlay with Horizontal Motion */}
            <motion.div
              key={`secondary-overlay-${currentSlide}`}
              className="absolute inset-0 bg-black/30 pointer-events-none"
              custom={direction}
              variants={secondaryOverlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            {/* Subtle Pattern Overlay for Texture */}
            <motion.div
              key={`pattern-overlay-${currentSlide}`}
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '12px 12px'
              }}
              animate={{
                opacity: [0, 0.2],
                transition: { delay: 0.5, duration: 0.8 }
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3 }
              }}
            />
          </AnimatePresence>

          {/* Content */}
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                z-20 text-white flex justify-center flex-col items-center w-full px-4'>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`title-${currentSlide}`}
                className='text-8xl font-display font-light mb-2 text-center'
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {slides[currentSlide].title}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              <motion.p
                key={`subtitle-${currentSlide}`}
                className='text-gray-300 mb-6 text-center'
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={`cta-${currentSlide}`}
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link href={slides[currentSlide].link}>
                  <Button className='bg-transparent rounded-full text-gray-300 border border-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300' variant={'outline'}>
                    {slides[currentSlide].cta}
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Custom Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return;
              setIsAnimating(true);
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 1000);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows */}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-4 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="absolute top-1/2 -translate-y-1/2 right-4 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

export default Carousel