"use client";

import React, { useState, useEffect } from "react";

// Pexels API Key and URL
const API_KEY = "qwlQE1km54RucjjTVkB7XkbcsGIunA6Hdl6swaMxND4moWMtQq9nRNOF";
const API_URL = "https://api.pexels.com/v1/curated";

interface ImageComponentProps {
  imageFile: string;
  alt: string;
}

const ImageComponent = ({ imageFile, alt }: ImageComponentProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isValidImage, setIsValidImage] = useState<boolean | null>(null);
  const placeHolderImg = "/images/placeholder.gif";

  // Validate imageFile URL and fetch fallback if needed
  useEffect(() => {
    const validateImage = async () => {
      if (!imageFile) {
        setIsValidImage(false);
        return;
      }

      const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/${imageFile}`;
      try {
        // Check if the image URL is accessible
        const response = await fetch(imageUrl, { method: "HEAD" });
        if (response.ok) {
          setIsValidImage(true);
          setImageSrc(imageUrl);
        } else {
          setIsValidImage(false);
        }
      } catch (error) {
        console.error("Error validating image:", error);
        setIsValidImage(false);
      }
    };

    const fetchFallbackImage = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch fallback image");
        }
        const data = await response.json();
        const randomImage =
          data.photos[Math.floor(Math.random() * data.photos.length)].src.medium;
        setImageSrc(randomImage);
      } catch (error) {
        console.error("Error fetching fallback image:", error);
        setImageSrc(placeHolderImg); // Use local placeholder if Pexels fails
      }
    };

    if (imageFile) {
      validateImage();
    } else {
      fetchFallbackImage();
    }
  }, [imageFile]);

  // While validating or fetching, show a loading placeholder
  if (isValidImage === null && imageFile) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#eee",
          borderRadius: "8px",
        }}
      />
    );
  }

  // Render the image or placeholder
  return imageSrc ? (
    <img
      src={imageSrc}
      alt={alt || "Event image"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
      }}
      onError={() => {
        // If the image fails to load (e.g., Pexels image fails), use local placeholder
        if (imageSrc !== placeHolderImg) {
          setImageSrc(placeHolderImg);
        }
      }}
    />
  ) : (
    <img
      src={placeHolderImg}
      alt={alt || "Event image"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );
};

export default ImageComponent;