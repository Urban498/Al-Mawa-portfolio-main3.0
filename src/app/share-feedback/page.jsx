"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { Work_Sans, Inter } from "next/font/google";
import { useTranslations } from 'next-intl';
import { toast } from "sonner";
import localFont from "next/font/local";

const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const corpta = localFont({
  src: "../fonts/Corpta.otf",
  variable: "--font-corpta",
  display: "swap",
});

// Animation helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.2 },
});

export default function ShareFeedback() {
  const t = useTranslations('shareFeedbackPage');
  const [formData, setFormData] = useState({
    feedback: "",
    name: "",
    email: "",
    designation: "",
    rating: 5,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
        setFormData({
          feedback: "",
          name: "",
          email: "",
          designation: "",
          rating: 5,
          image: "",
        });
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to save review. Please try again.');
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-background via-muted to-card text-foreground ${corpta.variable}`}>
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
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl">
              {t('description')}
            </p>
          </motion.div>
        </section>

        {/* Two Column Layout */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Benefits */}
            <motion.div
              {...fadeUp(0.1)}
              className="flex flex-col justify-center"
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                    {t('benefits.title')}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {t('benefits.intro')}
                  </p>
                </div>

                <div className="space-y-4">
                  {t.raw('benefits.items').map((item, index) => (
                    <div key={index} className={`flex items-start gap-4 p-4 rounded-lg border ${index === 0 ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100' : index === 1 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100'}`}>
                      <CheckCircle2 className={`w-6 h-6 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-[#0ea5e9]' : index === 1 ? 'text-green-600' : 'text-purple-600'}`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Feedback Form */}
            <motion.div
              {...fadeUp(0.2)}
              className="flex flex-col justify-center"
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                  {t('form.title')}
                </h2>
                <p className="text-gray-600 mb-8">
                  Tell us about your experience with our services
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.feedback.label')}
                    </label>
                    <textarea
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleChange}
                      required
                      placeholder={t('form.feedback.placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none resize-none h-28 transition-all"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.name.label')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t('form.name.placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('form.email.placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.designation.label')}
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder={t('form.designation.placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      {t('form.rating.label')}
                    </label>
                    <div className="flex items-center gap-3">
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none transition-all"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} Star{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < formData.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('form.image.label')}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0ea5e9] file:text-white hover:file:bg-[#0ea5e9]/90 transition-all"
                    />
                    {formData.image && (
                      <div className="mt-3 flex justify-center">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#0ea5e9]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-8 px-6 py-3 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    {t('form.submitButton')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
