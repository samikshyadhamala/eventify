"use client";

import React, { useRef } from 'react';
import '@/styles/Locations.css';

const districts = [
  { name: "Kathmandu", img: "public/images/location/kathmandu.jpg" },
  { name: "Pokhara", img: "/images/location/pokhara.jpg" },
  { name: "Lalitpur", img: "/images/location/lalitpur.jpg" },
  { name: "Bhaktapur", img: "/images/location/bhaktapur.jpg" },
  { name: "Chitwan", img: "/images/location/chitwan.jpg" },
  { name: "Butwal", img: "/images/location/butwal.jpg" },
  { name: "Biratnagar", img: "/images/location/biratnagar.jpg" },
  { name: "Nepalgunj", img: "/images/location/nepalgunj.jpg" },
  { name: "Dharan", img: "/images/location/dharan.jpg" },
  { name: "Janakpur", img: "/images/location/janakpur.jpg" },
];


const Locations = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / 3; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="locations-wrapper">
      <h2 className="locations-title">Top Destinations</h2>

      <div className="locations-carousel">
        <button className="arrow left" onClick={() => scroll('left')}>&larr;</button>

        <div className="locations-scroll" ref={scrollRef}>
          {districts.map((district, idx) => (
            <div className="location-card" key={idx}>
              <img src={district.img} alt={district.name} />
              <p className="location-name">{district.name}</p>
            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll('right')}>&rarr;</button>
      </div>
    </div>
  );
};

export default Locations;
