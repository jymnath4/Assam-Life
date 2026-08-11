// components/BarberPole.tsx
export default function BarberPole() {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid #d4a24c",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `repeating-linear-gradient(
            45deg,
            #c0392b 0px, #c0392b 6px,
            #f4e4d0 6px, #f4e4d0 12px,
            #2c3e50 12px, #2c3e50 18px
          )`,
          animation: "spin 3s linear infinite",
        }}
      />
    </div>
  );
}