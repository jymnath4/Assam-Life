// components/Player.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { getNowPlaying, type Track } from "@/lib/radio";

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const startedRef = useRef(false);

  const [now, setNow] = useState<{ track: Track; offset: number; next: Track } | null>(null);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const sync = async () => {
    try {
      let res;
      try {
        const r = await fetch("/api/now-playing");
        if (r.ok) {
          res = await r.json();
        }
      } catch {
        // Fallback for static hosts (e.g. GitHub Pages)
      }

      if (!res || !res.track) {
        res = getNowPlaying();
      }

      setNow(res);
      const audio = audioRef.current;
      if (!audio || !res.track) return;

      const fullSrc = location.origin + res.track.src;
      const isNewTrack = audio.src !== fullSrc;

      if (isNewTrack) {
        audio.src = res.track.src;
        audio.currentTime = res.offset;
      } else if (Math.abs(audio.currentTime - res.offset) > 2 && !audio.ended) {
        audio.currentTime = res.offset;
      }

      if (startedRef.current && !userPausedRef.current) {
        if (audio.paused || isNewTrack) {
          audio.play().catch(() => {});
        }
      }
    } catch (err) {
      console.error("Failed to sync radio state", err);
    }
  };

  useEffect(() => {
    sync();
    const interval = setInterval(sync, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      if (startedRef.current && !userPausedRef.current) {
        sync();
      }
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMeta = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("playing", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("durationchange", onLoadedMeta);

    setIsPlaying(!audio.paused && audio.currentTime > 0 && !audio.ended);
    if (audio.duration) setDuration(audio.duration);
    if (audio.currentTime) setCurrentTime(audio.currentTime);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("playing", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("durationchange", onLoadedMeta);
    };
  }, [now]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!startedRef.current) {
      startedRef.current = true;
      setStarted(true);
    }

    if (audio.paused) {
      userPausedRef.current = false;
      audio.play().catch((e) => console.error("Play failed:", e));
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      {!now ? (
        <p style={{ color: "#9c8a78" }}>Loading...</p>
      ) : (
        <div
          className="player-card"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            width: "100%",
            maxWidth: "700px",
            padding: "1rem 1.5rem",
            borderRadius: "60px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            background: "rgba(20, 15, 12, 0.35)",
          }}
        >
          <img
            className="player-cover-image"
            src={now.track.cover}
            alt={now.track.title}
            width={64}
            height={64}
            style={{
              position: "relative",
              zIndex: 2,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
              boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2, flex: 1, minWidth: 0 }}>
            <h2
              className="player-track-title"
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                margin: "0 0 0.15rem",
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {now.track.title}
            </h2>
            <p
              style={{
                fontSize: "0.8rem",
                margin: "0 0 0.5rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {now.track.artist}
            </p>

            <div
              style={{
                width: "100%",
                height: "3px",
                background: "rgba(255,255,255,0.25)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  height: "100%",
                  background: "#fff",
                  transition: "width 0.3s linear",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                margin: "0.3rem 0 0",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              flexShrink: 0,
            }}
          >
            <button
              aria-label="Previous"
              disabled
              style={{
                background: "transparent",
                border: "none",
                cursor: "not-allowed",
                opacity: 0.4,
                padding: 0,
              }}
              title="This is a synced radio — no skipping"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              className="player-play-btn"
              onClick={handleToggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#fff",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
              }}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#150c08">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#150c08" style={{ marginLeft: "2px" }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              aria-label="Next"
              disabled
              style={{
                background: "transparent",
                border: "none",
                cursor: "not-allowed",
                opacity: 0.4,
                padding: 0,
              }}
              title="This is a synced radio — no skipping"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

