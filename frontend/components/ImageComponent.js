"use client";
import React, { useState, useEffect } from "react";

// Pexels API Key and URL
const API_KEY = "qwlQE1km54RucjjTVkB7XkbcsGIunA6Hdl6swaMxND4moWMtQq9nRNOF";
const API_URL = "https://api.pexels.com/v1/curated";

const ImageComponent = ({ imageFile, alt }) => {
  const [fallbackImage, setFallbackImage] = useState("");

  useEffect(() => {
    if (!imageFile) {
      const fetchImage = async () => {
        try {
          const response = await fetch(API_URL, {
            headers: {
              Authorization: API_KEY,
            },
          });
          const data = await response.json();
          const randomImage =
            data.photos[Math.floor(Math.random() * data.photos.length)].src.medium;
          setFallbackImage(randomImage);
        } catch (error) {
          console.error("Error fetching fallback image:", error);
        }
      };

      fetchImage();
    }
  }, [imageFile]);

  // Use local image or fallback image from Pexels
  const src = imageFile ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/${imageFile}` : fallbackImage;

  return src ? (
    <img
      src={src}
      alt={alt || "Event image"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px", // Rounded corners
      }}
    />
  ) : (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#eee",
        borderRadius: "8px",
      }}
    />
  );
};

export default ImageComponent;
