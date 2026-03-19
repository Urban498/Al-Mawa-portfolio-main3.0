"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ReferralFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralFormModal({ isOpen, onClose }: ReferralFormModalProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    companyName: "",
    designationPosition: "",
    referralSource: "",
    interestedServices: "",
    clientDetails: "",
    message: "",
  });

  const handleData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/referral-apply", data);
      setSuccess("Referral application submitted successfully!");
      
      // Reset form
      setData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        companyName: "",
        designationPosition: "",
        referralSource: "",
        interestedServices: "",
        clientDetails: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
              Referral Application Form
            </h2>

            {error && (
              <p className="bg-red-100 mb-4 text-red-700 text-sm p-3 rounded">{error}</p>
            )}

            {success && (
              <p className="bg-green-100 mb-4 text-green-700 text-sm p-3 rounded">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  onChange={handleData}
                  value={data.fullName}
                  placeholder="Full Name"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                />

                <input
                  type="email"
                  name="emailAddress"
                  onChange={handleData}
                  value={data.emailAddress}
                  placeholder="Email Address"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleData}
                  value={data.phoneNumber}
                  placeholder="Phone Number"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                />

                <input
                  type="text"
                  name="companyName"
                  onChange={handleData}
                  value={data.companyName}
                  placeholder="Company Name"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="designationPosition"
                  onChange={handleData}
                  value={data.designationPosition}
                  placeholder="Your Designation/Position"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                />

                <select
                  name="referralSource"
                  onChange={handleData}
                  value={data.referralSource}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                >
                  <option value="">Select Referral Source</option>
                  <option value="Web Services">Web Services</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <select
                name="interestedServices"
                onChange={handleData}
                value={data.interestedServices}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
              >
                <option value="">What services are you interested in?</option>
                <option value="Web Services">Web Services</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="IT Services">IT Services</option>
                <option value="All Services">All Services</option>
              </select>

              <textarea
                name="clientDetails"
                placeholder="Tell us about your potential clients..."
                onChange={handleData}
                value={data.clientDetails}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                rows={3}
              />

              <textarea
                name="message"
                placeholder="Additional Message (optional)"
                onChange={handleData}
                value={data.message}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0ea5e9] outline-none"
                rows={2}
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-800 rounded-lg py-2 md:py-3 font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0ea5e9] text-white rounded-lg py-2 md:py-3 font-medium hover:bg-[#0284c7] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
