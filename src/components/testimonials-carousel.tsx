"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  status: string;
  feedback: string;
  name: string;
  designation: string;
  rating?: number;
  image?: string;
}

const TestimonialsCarousel = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Load reviews from API on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        const approvedReviews = (data as Review[]).filter(
          (review) => review.status === "approved"
        );
        // Duplicate reviews for seamless looping
        setReviews([...approvedReviews, ...approvedReviews]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isLoading || reviews.length === 0 || isHovered) return;

    let frameId: number;
    const scrollStep = 0.8;

    const animate = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const halfWidth = container.scrollWidth / 2;
      container.scrollLeft += scrollStep;

      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isLoading, reviews.length, isHovered]);

  if (isLoading || reviews.length === 0) {
    return null;
  }

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect fill='%23E5E7EB' width='128' height='128'/%3E%3Ccircle cx='64' cy='40' r='16' fill='%239CA3AF'/%3E%3Cpath d='M32 100 Q32 75 64 75 Q96 75 96 100 L96 128 L32 128 Z' fill='%239CA3AF'/%3E%3C/svg%3E";

  return (
    <section className="relative bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#0ea5e9] font-bold mb-4">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-4">
            What Our Clients{" "}
            <span className="text-[#0ea5e9]">Say</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Real testimonials from businesses we've helped transform and scale
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient overlays for edge effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-gray-100 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-gray-100 to-transparent z-20 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {reviews.map((review, index) => {
              const clientImage = review.image || defaultImage;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.05 * index,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex-shrink-0 w-full sm:w-96"
                >
                  <div className="group/card relative rounded-2xl border-2 border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-[#0ea5e9] hover:shadow-lg hover:shadow-blue-500/15 p-8 flex flex-col overflow-hidden">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover/card:from-blue-50 group-hover/card:to-cyan-50 rounded-2xl transition-colors duration-300" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0ea5e9] via-cyan-400 to-[#0ea5e9] transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left" />

                    {/* Rating */}
                    <div className="relative z-10 flex items-center justify-start gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < (review.rating || 5)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="relative z-10 text-sm md:text-base text-gray-700 mb-8 flex-grow leading-relaxed">
                      "{review.feedback}"
                    </p>

                    {/* Divider */}
                    <div className="relative z-10 w-12 h-0.5 bg-gradient-to-r from-[#0ea5e9] to-transparent mb-6" />

                    {/* Client Info */}
                    <div className="relative z-10 flex items-center gap-4">
                      <img
                        src={clientImage}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#0ea5e9] flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-[#0ea5e9] font-medium">
                          {review.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex items-center justify-center gap-2 mt-8 text-gray-600 text-sm"
        >
          <span>↕ Scroll to explore more</span>
        </motion.div>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
