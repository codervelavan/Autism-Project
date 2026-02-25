import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroWeave AI | Advanced Autism Screening",
  description: "Identify autism risks using multimodal AI analysis of behavioral data and video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0A0B1E] text-[#F8FAFC]`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(32,255,176,0.05)_0%,_transparent_50%)] pointer-events-none"></div>
        <Navbar />
        <main className="relative pt-28">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
