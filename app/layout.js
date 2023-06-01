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
  title: "Cyber Bubble",
  description: "",
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
