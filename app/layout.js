import "./globals.css";
import Nav from "@/components/Nav";
import { Quicksand } from "next/font/google";
import Playlist from "@/components/Playlist";
import { Suspense } from "react";
import Loading from "./loading";
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "CyberBubble",
  description:
    "CyberBubble is a space for your ideas and thoughts while you stay focus and disconnected from everything else.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans bg-black`}>
        <Nav />
        <Suspense fallback={<Loading />}>{children}</Suspense>

        <Playlist />
      </body>
    </html>
  );
}
