"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const lastShown = localStorage.getItem('autoModalLastShown');
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 86400000 ms

    if (!lastShown || (now - parseInt(lastShown)) > twentyFourHours) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('autoModalLastShown', now.toString());
      }, 700);
      return () => clearTimeout(timer);
    }
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
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 md:p-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-center text-gray-900">
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />

              <input
                type="tel"
                name="number"
                onChange={handleData}
                value={data.number}
                placeholder="Your Phone Number"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />

              <input
                type="text"
                name="company"
                onChange={handleData}
                value={data.company}
                placeholder="Company Name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />

              <textarea
                name="message"
                placeholder="Message..."
                onChange={handleData}
                value={data.message}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
              />

              <label className="flex items-start gap-2 text-sm text-gray-700">
                <span>
                  By clicking Sign Up, you confirm that you have read and agree
                  to our{" "}
                  <Link href="/policy" className="text-cyan-600">
                    Terms & Conditions and Privacy Policy
                  </Link>.
                </span>
              </label>

              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={() => setConsent(!consent)}
                  className="mt-1"
                  required
                />
                <span>
                  By submitting this form, you agree to be contacted by us on{" "}
                  <b>WhatsApp / SMS / Email</b> regarding your enquiry.
                </span>
              </label>

              <button
                type="submit"
                disabled={!consent}
                className="w-full bg-black text-white rounded-lg py-2 md:py-3 font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
