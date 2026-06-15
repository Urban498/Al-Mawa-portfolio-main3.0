"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import nitin from "../testimonials/images/nitin.png";
import divyansh from "../testimonials/images/divyansh.png";
import hotel from "../testimonials/images/hotel.png";
import chocolate from "../testimonials/images/chocolate.png";
import lifestyle from "../testimonials/images/lifestyle.png";
import Sonai from "../testimonials/images/sonal_School_logo2.png";
import TicketCRM from "../testimonials/images/ticket_manage_crm.png";
import infinity from "../../../public/infinity1.png";
import fortune from "../../../public/fortune1.png";
import surajDryFruits from "../../../public/suraj_dry_fruits.png";
import sonaSchoolFee from "../../../public/sona_software.png";
import karyon from "../../../public/karyon.png";
import spArt from "../../../public/SP_Art.png";
import erudition from "../../../public/eduration.png";
import morpankh from "../../../public/morpankh.png";
import khm from "../../../public/KHM.png";
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
const softwareDevelopment = [
  {
    url: "https://www.kontechindustriesticketcrm.live/dashboard",
    name: "Kontech Industries Ticket Management Crm",
    img: TicketCRM,
    description:
      "A comprehensive customer relationship management system designed to streamline ticket handling and workflow automation.",
    overview:
      "This modern CRM solution helps businesses manage support tickets efficiently with real-time tracking, automated routing, and priority-based queue management.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://www.infinityloanservices.com",
    name: "Infinity Loan Services",
    img: infinity,
    description:
      "A digital lending platform offering quick and easy loan applications with transparent terms and instant approval processes.",
    overview:
      "Infinity Loan Services provides users with a seamless online lending experience, featuring instant eligibility checks, transparent pricing, and fast disbursement.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://fortuneloan.services/",
    name: "Fortune Loan Services",
    img: fortune,
    description:
      "An advanced loan management platform providing financial solutions with AI-powered risk assessment and customer matching.",
    overview:
      "Fortune Loan Services offers intelligent loan matching, competitive rates, and comprehensive financial tools for both lenders and borrowers.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://school-fees-hub-kappa.vercel.app",
    name: "Sona'i School Fee Receipt Management",
    img: sonaSchoolFee,
    description:
      "A comprehensive fee receipt generation software for educational institutions, streamlining fee collection and receipt management.",
    overview:
      "This fee management system enables schools to efficiently generate, track, and manage student fee receipts. Features include automated receipt generation, payment tracking, monthly collections overview, and fee breakdown analytics for better financial management.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
];

const socialMediaWork = [
  {
    url: "https://www.instagram.com/nitinhardwarepune?igsh=cWxsNDJ3Zmp0ZnBv",
    title: "Nitin Hardware",
    platform: "Social Media Marketing",
    img: nitin,
    description:
      "Comprehensive social media strategy for a hardware retail business focused on engagement and local market penetration.",
    overview:
      "Managing Instagram presence with product showcases, customer testimonials, and promotional campaigns to drive engagement and foot traffic.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://www.instagram.com/lifestylehomedecorpune?igsh=MWZwenJnd3MyZDM3aQ==",
    title: "Life Style Home Decor",
    platform: "Social Media Marketing",
    img: lifestyle,
    description:
      "Strategic social media marketing for a home decor brand, focusing on visual storytelling and trendy content.",
    overview:
      "Creating aesthetically appealing content that showcases home decor products, interior design inspiration, and customer transformations.",
    technologies: [
      "Instagram",
      "Pinterest",
      "Canva",
      "Reels",
      "Influencer Partnerships",
    ],
  },
  {
    url: "https://www.instagram.com/thechocolateroom_fcroad?igsh=MWFrMThpNTNzc2E5MQ==",
    title: "The Chocolate Room",
    platform: "Social Media Marketing",
    img: chocolate,
    description:
      "Food and beverage brand marketing with focus on mouth-watering visuals and customer engagement.",
    overview:
      "Building a strong community around premium chocolate products through engaging content, promotional offers, and user-generated content.",
    technologies: [
      "Instagram Stories",
      "Food Photography",
      "Video Marketing",
      "Email Integration",
      "Engagement Campaigns",
    ],
  },
  {
    url: "https://www.instagram.com/hotel_rest_inn?igsh=NHAxMXN5ZThpOWNy",
    title: "Hotel Rest INN",
    platform: "Social Media Marketing",
    img: hotel,
    description:
      "Hospitality brand social media management promoting room bookings and customer experiences.",
    overview:
      "Showcasing hotel facilities, room tours, local attractions, and guest reviews to encourage bookings and build reputation.",
    technologies: [
      "Instagram",
      "Facebook",
      "Booking.com Integration",
      "Virtual Tours",
      "Customer Reviews",
    ],
  },
  {
    url: "https://www.instagram.com/divyyansh_fashion_?igsh=MWhzcGgzMXg5YXhpcw==",
    title: "Divyansh Fashion Zone",
    platform: "Social Media Marketing",
    img: divyansh,
    description:
      "Fashion retail marketing with focus on latest trends, seasonal collections, and fashion-forward content.",
    overview:
      "Managing fashion brand presence with outfit styling, trend reports, fashion tips, and collection launches to drive sales.",
    technologies: [
      "Instagram",
      "TikTok",
      "Fashion Photography",
      "Trend Analysis",
      "Influencer Collabs",
    ],
  },
];

const websiteProjects = [
  {
    url: "https://www.nitinhardware.in/",
    name: "Nitin Hardware",
    img: nitin,
    description:
      "A comprehensive e-commerce platform for hardware retail with product catalog and online ordering system.",
    overview:
      "Full-featured hardware store website featuring product categories, pricing, inventory management, and customer reviews.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shopify",
      "Payment Gateway",
    ],
  },
  {
    url: "https://www.lifestylehomedecor.in/",
    name: "Life Style Home Decor",
    img: lifestyle,
    description:
      "Beautiful home decor e-commerce site showcasing furniture, decorative items, and interior design inspiration.",
    overview:
      "Interactive online store with product filters, mood boards, designer consultation booking, and virtual room visualization tools.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Webflow", "CMS"],
  },
  {
    url: "https://www.sonairesidentialworldschool.in",
    name: "Sona 'I' Residential World School",
    img: Sonai,
    description:
      "Educational institution website providing school information, admissions, and online learning resources.",
    overview:
      "School website featuring academic programs, teacher profiles, student achievements, admissions portal, and event updates.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Learning Management System",
      "Student Portal",
    ],
  },
  {
    url: "https://www.surajnaturodryfruits.online",
    name: "Suraj Dry Fruits",
    img: surajDryFruits,
    description:
      "Premium dry fruits e-commerce website offering a curated selection of high-quality natural and organic dry fruits.",
    overview:
      "Online marketplace for premium dry fruits featuring product listings, nutritional information, customer reviews, and secure checkout. The platform specializes in premium natural and organic dry fruits sourced from trusted suppliers, with detailed product descriptions and health benefits.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://karyon-final-updated.vercel.app/",
    name: "Karyon",
    img: karyon,
    description:
      "A modern and dynamic website showcasing innovative solutions with a sleek design and user-friendly interface.",
    overview:
      "Karyon features a contemporary design with smooth animations, responsive layout, and intuitive navigation. The platform highlights cutting-edge services and products with an emphasis on visual appeal and user experience.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://sp-art-hub-main-updated-website.vercel.app/",
    name: "SP Art Hub",
    img: spArt,
    description:
      "An artistic platform dedicated to showcasing creative works and connecting artists with art enthusiasts.",
    overview:
      "SP Art Hub provides a vibrant space for artists to display their portfolios, connect with potential buyers, and engage with the art community. The platform features gallery views, artist profiles, and seamless browsing experiences.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://www.eruditioninfinite.com/",
    name: "Erudition",
    img: erudition,
    description:
      "An educational platform focused on learning and knowledge sharing with modern interactive features.",
    overview:
      "Erudition offers a comprehensive learning experience with course listings, educational resources, and interactive learning tools. The platform is designed to facilitate knowledge acquisition and skill development in an engaging digital environment.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    url: "https://www.morpankhsaree.com/",
    name: "Morpankh Saree",
    img: morpankh,
    description:
      "An elegant e-commerce platform for traditional sarees featuring a beautiful collection of ethnic wear.",
    overview:
      "Morpankh Saree showcases a stunning collection of traditional and contemporary sarees with detailed product descriptions, high-quality imagery, and a seamless shopping experience. The platform celebrates the rich heritage of Indian ethnic fashion.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  
  {
    url: "https://khm-five.vercel.app/",
    name: "KHM Infra",
    img: khm,
    description:
      "######",
    overview:
      "##########",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
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
// Project Modal Component
// ----------------------
const ProjectModal = ({ isOpen, project, onClose }) => {
  if (!isOpen || !project) return null;

  const projectTitle = project.name || project.title;
  const projectImg = project.img;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-screen h-screen md:w-[90vw] md:h-[90vh] md:max-w-6xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Modal Header with Image - Full Width on Desktop */}
        <div className="relative w-full md:w-1/2 h-1/3 md:h-full bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex items-center justify-center">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Project Image - Full Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src={projectImg}
              alt={projectTitle}
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all duration-300 group/close z-20"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover/close:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content - Right Side */}
        <div className="w-full md:w-1/2 h-2/3 md:h-full p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Project Title */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {projectTitle}
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          </div>

          {/* Project Description */}
          {project.description && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Project Overview */}
          {project.overview && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 mb-2">
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {project.overview}
              </p>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-600 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-600 font-medium hover:bg-blue-100 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-center flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Project
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ----------------------
// Social Media Card Component (CORRECTED)
// ----------------------
const SocialMediaCard = ({ item, index, onProjectOverview }) => {
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
              {onProjectOverview && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onProjectOverview(item);
                  }}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group/btn"
                  title="Project Overview"
                >
                  <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                </button>
              )}
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
const WebsiteCard = ({
  site,
  index,
  t,
  badgeType = "Website Development",
  onProjectOverview,
}) => {
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
                  {badgeType}
                </span>
              </div>
            </div>

            {/* External link and Project Overview buttons */}
            <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              {onProjectOverview && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onProjectOverview(site);
                  }}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 group/btn"
                  title="Project Overview"
                >
                  <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                </button>
              )}
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
                <span>{t("liveStatus")}</span>
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
export default function OurWorkPage() {
  const t = useTranslations("ourWorkPage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectOverview = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <main
      className={`min-h-screen bg-gradient-to-b from-background via-muted to-card text-foreground ${corpta.variable}`}
    >
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
      />

      <div className="relative isolate overflow-hidden z-0">
        {/* Hero Section */}
        <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-14 md:pt-24 lg:pt-28 lg:pb-16">
          <motion.div
            {...fadeUp(0)}
            className="max-w-3xl space-y-6 md:space-y-7"
          >
            {/* <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#0ea5e9] font-bold">
              Our Portfolio
            </p> */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {t("title")}
              <span className="font-[family-name:var(--font-corpta)] font-light text-7xl text-[#0ea5e9]">
                {" "}
                {t("titleHighlight")}{" "}
              </span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t("description")}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs md:text-sm text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                {t("badges.services")}
              </span>
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                {t("badges.approach")}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
        </div>

        {/* Websites Section */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col gap-6 mb-12 md:mb-14"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-[#0ea5e9] to-cyan-400 rounded-full" />
                <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-[#0ea5e9]">
                  {t("websiteSection.title")}
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                {t("websiteSection.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {websiteProjects.map((site, index) => (
              <WebsiteCard
                key={site.name + index}
                site={site}
                index={index}
                t={t}
                onProjectOverview={handleProjectOverview}
              />
            ))}
          </div>
        </section>

        {/* Software Development Section */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col gap-6 mb-12 md:mb-14"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-[#0ea5e9] to-cyan-400 rounded-full" />
                <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-[#0ea5e9]">
                  {t("softwareSection.title")}
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                {t("softwareSection.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {softwareDevelopment.map((software, index) => (
              <WebsiteCard
                key={software.name + index}
                site={software}
                index={index}
                t={t}
                badgeType="Software Development"
                onProjectOverview={handleProjectOverview}
              />
            ))}
          </div>
        </section>

        {/* Social Media Work Section */}
        <section className="relative max-w-6xl mx-auto px-4 pb-16 md:pb-20 lg:pb-24">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col gap-6 mb-12 md:mb-14"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-[#0ea5e9] to-cyan-400 rounded-full" />
                <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight text-[#0ea5e9]">
                  {t("socialMediaSection.title")}
                </h2>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                {t("socialMediaSection.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {socialMediaWork.map((item, index) => (
              <SocialMediaCard
                key={item.title + index}
                item={item}
                index={index}
                onProjectOverview={handleProjectOverview}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
