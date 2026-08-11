// app/page.tsx
import Player from "@/components/Player";
import Clock from "@/components/Clock";
import BackgroundSlider from "@/components/BackgroundSlider";
import OnlineCounter from "@/components/OnlineCounter";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      <BackgroundSlider />
      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 1.5rem",
          zIndex: 10,
        }}
      >
        <Clock />

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <OnlineCounter />
        </div>

        <div style={{ display: "flex", gap: "1.2rem" }}>
          <a
            href="https://open.spotify.com/playlist/3dS9ungopEEr2yZOfGKjV4?si=x5kwtmUwSXiGA9-VGOWhZQ&utm_source=copy-link&pi=Dfdb9ZvJRT2q4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M7.5 10c3-1 6.5-.7 9 .8M7 13c2.5-.8 5.5-.5 7.5.7M7.5 16c2-.6 4-.4 5.5.5" strokeLinecap="round" fill="none" />
            </svg>

            Spotify
          </a>

          <a
            href="https://music.youtube.com/watch?v=BJUdiB9W32U&si=EngRKfZqFu0CIhuL"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M10 9v6l5-3z" fill="#fff" stroke="none" />
            </svg>
            
            YT Music
          </a>
        </div>
      </div>

      {/* Player fixed to bottom center */}
      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem",
        }}
      >
        <Player />
      </div>
    </main>
  );
}