// components/OnlineCounter.tsx
"use client";

import { useEffect, useState } from "react";

export default function OnlineCounter() {
  const [count, setCount] = useState(30);

  useEffect(() => {
    // Generate initial live listener count between 28 and 42 based on current time
    const getBaseCount = () => {
      const now = new Date();
      const minutes = now.getMinutes() + now.getHours() * 60;
      return 28 + (minutes % 15);
    };

    setCount(getBaseCount());

    // Small realistic online user fluctuation every 7 seconds
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        const newCount = prev + delta;
        return Math.max(18, Math.min(65, newCount));
      });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.4rem 0.95rem",
        borderRadius: "20px",
        background: "rgba(15, 10, 8, 0.45)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <span
        style={{
          width: "9px",
          height: "9px",
          borderRadius: "50%",
          backgroundColor: "#10b981",
          boxShadow: "0 0 8px #10b981, 0 0 16px rgba(16, 185, 129, 0.7)",
          animation: "glowPulse 2s infinite ease-in-out",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.92rem",
          color: "#ffffff",
          letterSpacing: "0.02em",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {count}
      </span>
      <span
        style={{
          fontSize: "0.88rem",
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.9)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        অসমীয়া অনলাইন
      </span>
    </div>
  );
}
