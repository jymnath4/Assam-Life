// components/BackgroundSlider.tsx
"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/bg.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
  "/images/bg5.png",
  "/images/bg6.png",
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Preload all background images so transitions are seamless
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 60000); // Shuffle every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height: "100dvh",
        width: "100vw",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        backgroundColor: "#100906",
      }}
    >
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          >
            {/* Ambient blurred backdrop to fill screen with matching colors on all aspect ratios */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(32px) brightness(0.45)",
                transform: "scale(1.15)",
              }}
            />
            {/* Primary background image - cover on widescreen/laptops, contain on mobile portrait */}
            <div
              className="bg-slider-main-image"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
