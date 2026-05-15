"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LinkPreview } from "@/components/ui/link-preview";
import localFont from "next/font/local";
import { ExternalLink } from "lucide-react";

// Font Configuration
const corpta = localFont({
  src: "../fonts/Corpta.otf",
  variable: "--font-corpta",
  display: "swap",
});

// Types
interface DemoWebsite {
  title: string;
  description: string;
  category: "Business" | "Education" | "Perfume" | "Adventure" | "Fashion" | "Restaurant" | "Beauty" | "Art" | "Social";
  tech: string[];
  link: string;
  image: string;
}

// Demo Websites Data
const demoWebsites: DemoWebsite[] = [
  {
    title: "Wheel Harmony",
    description: "A modern automotive website showcasing vehicle services and harmony in design.",
    category: "Business",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://wheel-harmony.vercel.app",
    image: "/demo-wheel-harmony.png"
  },
  {
    title: "Craveable Co",
    description: "A delightful food and beverage website with an appetizing design.",
    category: "Restaurant",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://craveable-co.vercel.app",
    image: "/demo-craveable-co.png"
  },
  {
    title: "Lux Perfume",
    description: "A luxurious perfume website showcasing elegant fragrances and scents.",
    category: "Perfume",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://lux-perfume.vercel.app/",
    image: "/LUX Perfume.png"
  },
  {
    title: "Feesy School Hub",
    description: "A comprehensive school management hub for educational institutions and students.",
    category: "Education",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://feesy-school-hub.vercel.app",
    image: "/school_feesy.png"
  },
  {
    title: "Priyanka Play House",
    description: "Priyanka Play House is a fun and nurturing space for children that focuses on learning through play, creativity, and early childhood development in a safe and joyful environment.",
    category: "Education",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://priyanka-playful-canvas.vercel.app",
    image: "/priyankaplayhouse.png"
  },
  {
    title: "Indus RideTech",
    description: "Indus RideTech designs, manufactures and installs world-class adventure rides — zip lines, rope courses, giant swings and more.",
    category: "Adventure",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://adventure-park-pro.vercel.app",
    image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e1c74201-2a23-4b2f-a20e-b71e48aeddaa/id-preview-d2d54c82--6dc37258-4a04-433a-9667-f0b75e716616.lovable.app-1777006845769.png"
  },
  {
    title: "AquaVerse Adventure",
    description: "AquaVerse Adventure & Water Park offers thrilling water slides, wave pools, and premium attractions for all ages.",
    category: "Adventure",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://splash-thrills-demo.vercel.app",
    image: "/AquaVerse Adventure.png"
  },
  {
    title: "Her Style",
    description: "A stylish fashion and lifestyle website showcasing trendy clothing and accessories for modern women.",
    category: "Fashion",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://herstyle-lyart.vercel.app/",
    image: "/Her Style.png"
  },
  {
    title: "Royal Spice",
    description: "A premium restaurant and dining experience website showcasing authentic cuisine and exceptional service.",
    category: "Restaurant",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://royal-spice-feast.vercel.app/",
    image: "/Royal Spice.png"
  },
  {
    title: "Elevate Growth Shine",
    description: "A personal development and growth platform dedicated to helping individuals elevate their potential and shine in their journey.",
    category: "Business",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://elevate-grow-shine.vercel.app/",
    image: "/Elevet Growth Shine.png"
  },
  {
    title: "Akshay Arts",
    description: "An innovative AI-powered printing and design platform offering creative solutions for modern art and print services.",
    category: "Art",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://akshays-ai-print-magic.vercel.app/",
    image: "/Akshay Arts.png"
  },
  {
    title: "Pure Connect",
    description: "A modern social connectivity platform designed to bring people together through meaningful interactions and shared experiences.",
    category: "Social",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://pure-connect-vibe.vercel.app/",
    image: "/Pure Connect.png"
  },
  {
    title: "Savoria",
    description: "A delightful culinary destination offering exceptional dining experiences with gourmet cuisine and elegant ambiance.",
    category: "Restaurant",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://craveable-co.vercel.app/",
    image: "/Savoria.png"
  },
  {
    title: "Pavan Salon",
    description: "A premium beauty salon providing professional hair, makeup, and grooming services for a complete transformation experience.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://salon-pawan.vercel.app/",
    image: "/Pavan Salon.png"
  },
  {
    title: "Santosh Smartlook",
    description: "A sophisticated beauty and wellness dashboard offering personalized styling solutions and glamour services.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://smartlook-glam-dash.lovable.app/",
    image: "/Santosh Smartlook.png"
  },
  {
    title: "Sparsh View",
    description: "An innovative visual experience platform showcasing creative perspectives and artistic bloom through digital media.",
    category: "Art",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://sparsh-view-bloom.lovable.app/",
    image: "/Sparsh View.png"
  },
  {
    title: "The Makeover",
    description: "A luxury salon and makeover studio offering premium beauty services and transformative styling experiences.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://salon-elegance-xi.vercel.app/",
    image: "/The Makeover.png"
  },
  {
    title: "Sugan Swim Academy",
    description: "A professional swimming academy offering comprehensive training programs and aquatic education for all skill levels.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://sugan-swim-academy.vercel.app/",
    image: "/sugan swimming.png"
  },
  {
    title: "Salma S Salon",
    description: "A premium beauty salon providing professional hair styling, makeup, and grooming services for a complete transformation experience.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://salma-s-salon-showcase.vercel.app/",
    image: "/Salma salon.png"
  },
  {
    title: "Lekha Beauty Hub",
    description: "A comprehensive beauty destination offering premium skincare, makeup services, and personalized beauty solutions.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://lekha-beauty-hub.vercel.app/",
    image: "/Lekha beauty.png"
  },
  {
    title: "Big Boss Beauty Studio",
    description: "A high-end beauty studio specializing in advanced makeup artistry, hair design, and luxury beauty treatments.",
    category: "Beauty",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://big-boss-beauty-studio.vercel.app/",
    image: "/Big boss beauty.png"
  },
  {
    title: "D Maker Studio",
    description: "A creative design and manufacturing studio offering innovative solutions for custom products and digital design services.",
    category: "Business",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://d-maker-studio-hub-two.vercel.app/",
    image: "/D maker.png"
  },
  {
    title: "Karyon",
    description: "A modern and dynamic website showcasing innovative solutions with a sleek design and user-friendly interface.",
    category: "Business",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://karyon-final-updated.vercel.app/",
    image: "/karyon.png"
  },
  {
    title: "SP Art Hub",
    description: "An artistic platform dedicated to showcasing creative works and connecting artists with art enthusiasts.",
    category: "Art",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://sp-art-hub-main-updated-website.vercel.app/",
    image: "/SP_Art.png"
  },
  {
    title: "Erudition",
    description: "An educational platform focused on learning and knowledge sharing with modern interactive features.",
    category: "Education",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://erudition-jet.vercel.app/",
    image: "/eduration.png"
  },
  {
    title: "Morpankh Saree",
    description: "An elegant e-commerce platform for traditional sarees featuring a beautiful collection of ethnic wear.",
    category: "Fashion",
    tech: ["Next.js", "React", "Tailwind"],
    link: "https://morpankh-saree.vercel.app/",
    image: "/morpankh.png"
  }
];

// Categories
const categories = ["All", "Business", "Education", "Perfume", "Adventure", "Fashion", "Restaurant", "Beauty", "Art", "Social"];

// Animation Helpers
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.2 },
});


// Website Card Component
const WebsiteCard = ({ site, index }: { site: DemoWebsite; index: number }) => {
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
      <LinkPreview url={site.link} className="block h-full">
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
          <div className="relative aspect-video overflow-hidden">
            {/* Project Image */}
            <img
              src={site.image}
              alt={site.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = `https://via.placeholder.com/400x225/cccccc/000000?text=${encodeURIComponent(site.title)}`;
              }}
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Platform badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-600 uppercase">
                  Demo Website
                </span>
              </div>
            </div>

            {/* External link button */}
            <div className="absolute bottom-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(site.link, "_blank");
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
                {site.title}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {site.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex items-center gap-2 mt-4">
              {site.tech.map((tech, techIndex) => (
                <div key={techIndex} className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-600 uppercase tracking-wider font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>

            {/* Live status */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Live Demo</span>
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

// Page Component
export default function DemoWebsitesPage() {
  const t = useTranslations('demoWebsites');
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? demoWebsites 
    : demoWebsites.filter(site => site.category === selectedCategory);

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
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              {t('title')}
              <span className="font-[family-name:var(--font-corpta)] font-light text-7xl text-[#0ea5e9]">
                {" "}
                Websites{" "}
              </span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs md:text-sm text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                Demo Projects
              </span>
              <span className="rounded-full border border-border/60 bg-card/60 px-4 py-1.5 uppercase tracking-[0.22em]">
                Live Examples
              </span>
            </div>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
        </div>

        {/* Demo Websites Section */}
        <section className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          {/* Header */}
          <motion.div
            {...fadeUp(0.05)}
            className="mb-8 lg:mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              {/* Title */}
              <h2 className="text-xl md:text-4xl font-semibold tracking-tight">
                {selectedCategory === "All" ? "All Demo Websites" : `${selectedCategory} Websites`}
              </h2>
              
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-40 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                
                <div className="text-sm text-gray-500">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                </div>
              </div>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mt-2">
              {selectedCategory === "All" 
                ? "Explore our complete collection of demo websites showcasing modern design and functionality across different industries."
                : `Browse ${selectedCategory.toLowerCase()} websites with modern design and innovative features.`
              }
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((site, index) => (
              <WebsiteCard key={site.title + index} site={site} index={index} />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg mb-2">No projects found</div>
              <p className="text-gray-500 text-sm">
                Try selecting a different category or browse all projects.
              </p>
            </motion.div>
          )}
        </section>

        {/* Call to Action */}
        <section className="relative max-w-6xl mx-auto px-4 pb-16 md:pb-20 lg:pb-24">
          <motion.div
            {...fadeUp(0.05)}
            className="text-center space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-xl md:text-4xl font-semibold tracking-tight">
                {t('ctaTitle')}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
                {t('ctaDescription')}
              </p>
            </div>
            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-[#0ea5e9] text-white font-medium rounded-lg hover:bg-[#0ea5e9]/90 transition-colors duration-300"
              >
                {t('getStarted')}
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}