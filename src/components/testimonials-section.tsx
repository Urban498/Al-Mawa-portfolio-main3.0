"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

interface Review {
  status: string;
  feedback: string;
  name: string;
  designation: string;
  rating?: number;
  image?: string;
}

const TestimonialsSection = () => {
  const t = useTranslations("testimonialsPage");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        // Filter only approved reviews to display on home page
        const approvedReviews = (data as Review[]).filter(
          (review) => review.status === "approved"
        );
        setReviews(approvedReviews.slice(0, 6)); // Show first 6 reviews
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || reviews.length === 0) {
    return null;
  }

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Crect fill='%23E5E7EB' width='128' height='128'/%3E%3Ccircle cx='64' cy='40' r='16' fill='%239CA3AF'/%3E%3Cpath d='M32 100 Q32 75 64 75 Q96 75 96 100 L96 128 L32 128 Z' fill='%239CA3AF'/%3E%3C/svg%3E";

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#0ea5e9] font-bold mb-4">
            Professional Perspectives
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
            Voices From The{" "}
            <span className="text-[#0ea5e9]">Desk</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Designed to inform, inspire, and empower
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              >
                <div className="group relative h-full rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-[#0ea5e9] hover:shadow-xl hover:shadow-[#0ea5e9]/10 p-8 flex flex-col">
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-cyan-50/0 group-hover:from-blue-50 group-hover:to-cyan-50 rounded-2xl transition-colors duration-300 -z-10" />

                  {/* Rating */}
                  <div className="flex items-center justify-start gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < (review.rating || 5)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-sm md:text-base text-gray-700 mb-8 flex-grow leading-relaxed">
                    "{review.feedback}"
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#0ea5e9] to-transparent mb-6" />

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
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

                  {/* Hover indicator line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0ea5e9] via-cyan-400 to-[#0ea5e9] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="/testimonials"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#0ea5e9] text-white font-semibold rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/30"
          >
            View All Testimonials
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
