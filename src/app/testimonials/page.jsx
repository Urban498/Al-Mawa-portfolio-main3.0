"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LinkPreview } from "@/components/ui/link-preview";
import localFont from "next/font/local";
import { Play, ExternalLink, Share2, Eye } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logoblack.png";

// lOGO IMPORT
import nitin from "./images/nitin.png";
import divyansh from "./images/divyansh.png";
import hotel from "./images/hotel.png";
import chocolate from "./images/chocolate.png";
import lifestyle from "./images/lifestyle.png"

// ----------------------
// Font Configuration
// ----------------------
const corpta = localFont({
  src: "../fonts/Corpta.otf",
  variable: "--font-corpta",
  display: "swap",
});

// ----------------------
// Sample Data
// ----------------------
const socialMediaWork = [
  {
    url: "https://www.instagram.com/nitinhardwarepune?igsh=cWxsNDJ3Zmp0ZnBv",
    title: "Nitin Hardware",
    platform: "Social Media Marketing",
    img: nitin,
  },
  {
    url: "https://www.instagram.com/lifestylehomedecorpune?igsh=MWZwenJnd3MyZDM3aQ==",
    title: "Life Style Home Decor",
    platform: "Social Media Marketing",
    img: lifestyle,
  },
  {
    url: "https://www.instagram.com/thechocolateroom_fcroad?igsh=MWFrMThpNTNzc2E5MQ==",
    title: "The Chocolate Room",
    platform: "Social Media Marketing",
    img: chocolate,
  },
  {
    url: "https://www.instagram.com/hotel_rest_inn?igsh=NHAxMXN5ZThpOWNy",
    title: "Hotel Rest INN",
    platform: "Social Media Marketing",
    img: hotel,
  },
  {
    url: "https://www.instagram.com/divyyansh_fashion_?igsh=MWhzcGgzMXg5YXhpcw==",
    title: "Divyansh Fashion Zone",
    platform: "Social Media Marketing",
    img: divyansh,
  },
];

const websiteProjects = [
  {
    url: "https://www.nitinhardware.in/",
    name: "Nitin Hardware",
    img : nitin
  },
  {
    url: "https://www.lifestylehomedecor.in/",
    name: "Life Style Home Decor",
    img : lifestyle
  },
];

// ----------------------
// Animation Helpers
// ----------------------
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.2 },
});

// ----------------------
// Social Media Card Component (CORRECTED)
// ----------------------
const SocialMediaCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.06 * index,
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <LinkPreview url={item.url} className="block h-full">
        <div
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/50 h-full flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Video preview area */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Platform badge */}
            <div className="absolute top-4 left-4 z-20">
              <div className="px-3 py-1.5 rounded-full bg-white border border-gray-200">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-600 uppercase">
                  {item.platform}
                </span>
              </div>
            </div>

            {/* Play button - center */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className={`relative transition-all duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 animate-pulse" />

                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 group-hover:border-blue-400 transition-all duration-300">
                  <Image
                    src={item.img}
                    alt=""
                    width={100}
                    height={100}
                    className="object-contain transition-all duration-300 group-hover:scale-150"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(item.url, "_blank");
                }}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group/btn"
              >
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Content section */}
          <div className="relative p-5 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 leading-relaxed line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            {/* Engagement stats */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </LinkPreview>
    </motion.div>
  );
};

// ----------------------
// Website Card Component
// ----------------------
const WebsiteCard = ({ site, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: 0.07 * index,
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <LinkPreview url={site.url} className="block h-full">
        <div
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/50 h-full flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Website preview area */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden">
            {/* Gradient mesh background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Website icon/preview */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                className={`relative transition-all duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 group-hover:border-blue-400 transition-all duration-300">
                  <Image
                    src={site.img}
                    alt=""
                    width={70}
                    height={70}
                    className="object-contain transition-all duration-300 group-hover:scale-150"
                  />
                </div>
              </div>
            </div>

            {/* Platform badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-600 uppercase">
                  Website Development
                </span>
              </div>
            </div>

            {/* External link button */}
            <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(site.url, "_blank");
                }}
                className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group/btn"
              >
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>

          {/* Content section */}
          <div className="relative p-5 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 leading-relaxed group-hover:text-blue-600 transition-colors duration-300">
                {site.name}
              </h3>
            </div>

            {/* Tech stack */}
            <div className="flex items-center gap-2 mt-4">
              <div className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                <span className="text-[10px] text-blue-600 uppercase tracking-wider font-medium">
                  Next.js
                </span>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                <span className="text-[10px] text-blue-600 uppercase tracking-wider font-medium">
                  Tailwind
                </span>
              </div>
            </div>

            {/* Live status */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </LinkPreview>
    </motion.div>
  );
};

// ----------------------
// Page Component
// ----------------------
export default function TestimonialsPage() {
  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-background via-muted to-card text-foreground ${corpta.variable}`}
    >
      <div className="relative isolate overflow-hidden z-0">
        {/* Hero Section */}
        <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-14 md:pt-24 lg:pt-28 lg:pb-16">
          <motion.div
            {...fadeUp(0)}
            className="max-w-3xl space-y-6 md:space-y-7"
          >
            <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#0ea5e9] font-bold">
              Testimonials &amp; Case Studies
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              What Our
              <span className="font-[family-name:var(--font-corpta)] font-light text-7xl text-[#0ea5e9]">
                {" "}
                Clients{" "}
              </span>
              Say
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              A selection of brands that trust{" "}
              <span className="text-[#0ea5e9] font-bold">
                AL-MAWA International
              </span>{" "}
              to shape their digital presence – from high-performing social
              media campaigns to premium, conversion-focused websites.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs md:text-sm text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                Social Media • Ads • Web
              </span>
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                Strategy • Design • Development
              </span>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
        </div>

        {/* Social Media Work Section */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
          >
            <div className="space-y-3">
              <h2 className="text-xl md:text-4xl font-semibold tracking-tight">
                Our Social Media Work
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Engaging social media content designed to represent your brand
                with clarity and impact.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {socialMediaWork.map((item, index) => (
              <SocialMediaCard
                key={item.title + index}
                item={item}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Websites Section */}
        <section className="relative max-w-6xl mx-auto px-4 pb-16 md:pb-20 lg:pb-24">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
          >
            <div className="space-y-3">
              <h2 className="text-xl md:text-4xl font-semibold tracking-tight">
                Websites We Built
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Explore our portfolio of custom website solutions built for
                businesses of all sizes.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
            {websiteProjects.map((site, index) => (
              <WebsiteCard key={site.name + index} site={site} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
