"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LinkPreview } from "@/components/ui/link-preview";
import localFont from "next/font/local";
import { Play, ExternalLink, Share2, Eye, X, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
const ReviewCard = ({ review, index }) => {
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect fill='%23E5E7EB' width='128' height='128'/%3E%3Ccircle cx='64' cy='40' r='16' fill='%239CA3AF'/%3E%3Cpath d='M32 100 Q32 75 64 75 Q96 75 96 100 L96 128 L32 128 Z' fill='%239CA3AF'/%3E%3C/svg%3E";
  const clientImage = review.image || defaultImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.05 * index,
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 h-full flex flex-col">
        {/* Client Image */}
        <div className="mb-4 flex justify-center">
          <img
            src={clientImage}
            alt={review.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#0ea5e9]"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Feedback Text */}
        <p className="text-sm text-gray-700 mb-4 flex-grow leading-relaxed text-center">
          "{review.feedback}"
        </p>

        {/* Client Info */}
        <div className="border-t pt-4 text-center">
          <p className="font-semibold text-gray-900">{review.name}</p>
          <p className="text-xs text-gray-600">{review.designation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsPage() {
  const t = useTranslations('testimonialsPage');
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    
    const interval = setInterval(() => {
      const totalSets = Math.ceil(reviews.length / 3);
      setCurrentIndex((prev) => ((prev + 3) % (totalSets * 3)) < reviews.length ? (prev + 3) % (totalSets * 3) : 0);
    }, 5000); // 5 seconds
    
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Load reviews from API on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        // Filter only approved reviews to display on testimonials page
        const approvedReviews = data.filter(review => review.status === 'approved');
        setReviews(approvedReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    const totalSets = Math.ceil(reviews.length / 3);
    setCurrentIndex((prev) => {
      const newIndex = prev - 3;
      return newIndex < 0 ? (totalSets - 1) * 3 : newIndex;
    });
  };

  const handleNext = () => {
    const totalSets = Math.ceil(reviews.length / 3);
    setCurrentIndex((prev) => {
      const newIndex = prev + 3;
      return newIndex >= reviews.length ? 0 : newIndex;
    });
  };
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
              {t('label')}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {t('title')}
              <span className="font-[family-name:var(--font-corpta)] font-light text-7xl text-[#0ea5e9]">
                {" "}
                {t('titleHighlight')}{" "}
              </span>
              {t('titleEnd')}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs md:text-sm text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                {t('badges.services')}
              </span>
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                {t('badges.approach')}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Client Reviews Section - Carousel */}
        {reviews.length > 0 && (
          <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
            <motion.div
              {...fadeUp(0.05)}
              className="mb-10 md:mb-12"
            >
              <h2 className="text-xl md:text-4xl font-semibold tracking-tight mb-3">
                {t('reviewsSection.title')}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl whitespace-nowrap">
                {t('reviewsSection.subtitle')}
              </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons - Left */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:translate-x-0 p-2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm z-10"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Carousel - 3 Cards */}
              <div className="overflow-hidden px-4">
                <motion.div
                  animate={{ x: -currentIndex * (100 / 3) + "%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex gap-6"
                >
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-full md:w-1/3"
                    >
                      <ReviewCard 
                        review={review} 
                        index={index}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Buttons - Right */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-0 p-2 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm z-10"
                aria-label="Next reviews"
              >
                <ChevronRight size={24} />
              </button>

              {/* Carousel Indicators */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === Math.floor(currentIndex / 3)
                        ? "bg-[#0ea5e9] w-8"
                        : "bg-gray-300 hover:bg-gray-400 w-2"
                    }`}
                    aria-label={`Go to review set ${index + 1}`}
                  />
                ))}
              </div>

              {/* Review Counter */}
              <div className="text-center mt-4 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{Math.floor(currentIndex / 3) + 1}</span> of <span className="font-semibold text-gray-900">{Math.ceil(reviews.length / 3)}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
