"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function AutoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState(false);

  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    number: "",
    company: "",
    message: "",
  });

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/opt-in", data);
      console.log(res.data);

      // optional: close modal after success
      setIsOpen(false);

    } catch (error) {
      setError("Failed to submit");
      setTimeout(() => setError(""), 3000);
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:flex-row items-stretch max-h-[90vh]"
          >
            {/* Mobile Image - Top */}
            <div className="sm:hidden w-full h-56 bg-gray-100 relative overflow-hidden flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
                className="flex items-center justify-center h-full w-full p-4"
              >
                <Image 
                  src="/emi.png" 
                  alt="Al Mawa Services" 
                  width={400}
                  height={220}
                  className="object-contain max-w-full max-h-full w-auto h-auto drop-shadow-lg"
                  priority
                />
              </motion.div>
            </div>

            {/* Left Side - Image (Desktop Only) */}
            <div className="w-2/5 hidden sm:flex relative overflow-hidden items-center justify-center bg-gray-100 p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <Image 
                  src="/emi.png" 
                  alt="Al Mawa Services" 
                  width={400}
                  height={500}
                  className="object-contain max-w-full h-auto drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="relative w-full sm:w-3/5 p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-primary text-2xl font-bold transition"
            >
              ×
            </button>

            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center text-blue-600">
              Let Us Help You With the Right Solution
            </h2>

            {error && (
              <p className="bg-red-200 mb-2 opacity-50 text-red-500 text-sm mt-2 p-2 rounded">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                onChange={handleData}
                value={data.name}
                placeholder="Your Name"
                required
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />

              <input
                type="tel"
                name="number"
                onChange={handleData}
                value={data.number}
                placeholder="Your Phone Number"
                required
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />

              <input
                type="text"
                name="company"
                onChange={handleData}
                value={data.company}
                placeholder="Company Name"
                required
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />

              <textarea
                name="message"
                placeholder="Message..."
                onChange={handleData}
                value={data.message}
                required
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />

              <label className="flex items-start gap-2 text-sm text-blue-700">
                <span>
                  By clicking Sign Up, you confirm that you have read and agree
                  to our{" "}
                  <Link href="/policy" className="text-blue-700 font-semibold">
                    Terms & Conditions and Privacy Policy
                  </Link>.
                </span>
              </label>

              <label className="flex items-start gap-2 text-sm text-blue-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => setConsent(!consent)}
                  className="mt-1 accent-blue-600"
                  required
                />
                <span>
                  By submitting this form, you agree to be contacted by us on{" "}
                  <b className="text-blue-800">WhatsApp / SMS / Email</b> regarding your enquiry.
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-blue-200 text-blue-700 rounded-lg py-2 md:py-3 font-medium hover:bg-blue-300 transition"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={!consent}
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2 md:py-3 font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Sign Up
                </button>
              </div>
            </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
