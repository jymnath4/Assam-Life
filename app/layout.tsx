// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "জয় আই অসম",
  description: "অসমীয়া পৰিৱেশ আৰু গীত হ'ল অসমীয়া সংস্কৃতিৰ প্ৰাণকেন্দ্ৰ। প্ৰকৃতিৰ সৌন্দৰ্য, নদী, পাহাৰ, খেতি আৰু মানুহৰ সুখ-দুখ লৈ অসমীয়া পৰিৱেশ গঢ় লৈ উঠিছে",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}