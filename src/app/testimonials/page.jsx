"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {LinkPreview} from "@/components/ui/link-preview"
import localFont from "next/font/local";

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

const testimonials = [
  {
    name: "Ayesha Khan",
    company: "Noor Luxe Interiors",
    industry: "Luxury Interior Design",
    quote:
      "AL-MAWA International elevated our digital presence with a refined, modern aesthetic. Our clients consistently compliment the look and feel of our brand online.",
    rating: 5,
    image: "/images/clients/ayesha.jpg",
    scope: "Brand Identity • Social Media • Website",
  },
  {
    name: "Omar Siddiqui",
    company: "Siddiqui Holdings",
    industry: "Real Estate & Investment",
    quote:
      "From reels to landing pages, every asset feels precise and premium. The team understands luxury positioning and performance equally well.",
    rating: 5,
    image: "/images/clients/omar.jpg",
    scope: "Performance Creatives • Paid Ads • Web",
  },
  {
    name: "Fatima Al-Hassan",
    company: "Al-Hassan Couture",
    industry: "Luxury Fashion",
    quote:
      "Our campaigns finally match the standard of our garments. The creative direction, colour choices, and storytelling are consistently on-brand.",
    rating: 4,
    image: "/images/clients/fatima.jpg",
    scope: "Social Media Strategy • Campaigns",
  },
];

const socialMediaWork = [
  {
    url: "https://www.instagram.com/",
    title: "High-impact launch reel for luxury interiors",
    platform: "Instagram Reels",
  },
  {
    url: "https://www.facebook.com/",
    title: "Lead-generation ad set for real estate campaign",
    platform: "Meta Ads",
  },
  {
    url: "https://www.linkedin.com/",
    title: "Thought-leadership carousel for corporate brand",
    platform: "LinkedIn",
  },
  {
    url: "https://www.tiktok.com/",
    title: "Vertical storytelling series for luxury fashion",
    platform: "TikTok",
  },
  {
    url: "https://www.youtube.com/",
    title: "YouTube pre-roll concept for premium services",
    platform: "YouTube Ads",
  },
  {
    url: "https://www.instagram.com/",
    title: "Always-on content calendar for lifestyle brand",
    platform: "Instagram Posts",
  },
];

const websiteProjects = [
  {
    url: "https://al-mawa.international",
    name: "AL-MAWA International – Corporate Website",
  },
  {
    url: "https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=8756815515200173300&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062111&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1",
    name: "Amazon Website",
  },
  {
    url: "https://example.org/",
    name: "Siddiqui Holdings – Investor Relations Portal",
  },
  {
    url: "https://example.net/",
    name: "Al-Hassan Couture – Editorial Lookbook Experience",
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
// Page Component
// ----------------------

export default function TestimonialsPage() {
  return (
    <main className={`min-h-screen bg-gradient-to-b from-background via-muted to-card text-foreground ${corpta.variable}`}>
      <div className="relative isolate overflow-hidden z-0">
        {/* Hero Section */}
        <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-14 md:pt-24 lg:pt-28 lg:pb-16">
          <motion.div
            {...fadeUp(0)}
            className="max-w-3xl space-y-6 md:space-y-7"
          >
            <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-primary">
              Testimonials &amp; Case Studies
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              What Our 
                <span className="text-primary font-[family-name:var(--font-corpta)] font-light text-7xl"> Clients </span>
              Say
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              A selection of brands that trust{" "}
              <span className="text-primary">AL-MAWA International</span> to
              shape their digital presence – from high-performing social media
              campaigns to premium, conversion-focused websites.
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

        {/* Testimonials Section */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
          >
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Curated Client Experiences
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Stories from partners across interiors, real estate, luxury
                fashion, and more – all unified by a premium digital standard.
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs md:text-right">
              Each engagement blends strategic thinking, aesthetic direction, and
              rigorous execution across platforms.
            </p>
          </motion.div>
        </section>

        {/* Social Media Work Section */}
        <section className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-18">
          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
          >
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Our Social Media Work
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Reels, posts, and ad creatives built to stop the scroll while
                staying true to a refined, minimal aesthetic.
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs md:text-right">
              Every link below opens a live example. Replace these URLs with your
              own case studies for an up-to-date showcase.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {socialMediaWork.map((item, index) => (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.06 * index,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/60 p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:border-primary/80 hover:shadow-xl">
                  <div className="rounded-xl border border-border/60 bg-muted/60">
                    <LinkPreview
                      url={item.url}
                      className="block w-full"
                    >
                      <div className="aspect-video w-full flex items-center justify-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        {item.platform}
                      </div>
                    </LinkPreview>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {item.platform}
                    </p>
                  </div>
                </div>
              </motion.div>
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
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                Websites We Built
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Clean, conversion-oriented websites that extend the same luxury
                language across every touchpoint.
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs md:text-right">
              Swap these sample URLs with your live projects to turn this into a
              living portfolio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            {websiteProjects.map((site, index) => (
              <motion.div
                key={site.name + index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: 0.07 * index,
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/70 shadow-lg backdrop-blur-sm transition duration-300 hover:border-primary/80 hover:shadow-xl">
                  <CardContent className="pt-4">
                    <div className="rounded-xl border border-border/60 bg-muted/60">
                      <LinkPreview
                        url={site.url}
                        className="block w-full"
                      >
                        <div className="aspect-video w-full flex items-center justify-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                          {site.name}
                        </div>
                      </LinkPreview>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between pt-1 pb-4 px-4">
                    <p className="text-sm font-medium text-foreground">
                      {site.name}
                    </p>
                    <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      Live Site
                    </span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}