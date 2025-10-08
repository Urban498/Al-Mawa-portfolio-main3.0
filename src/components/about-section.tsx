"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Inter,Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

const content = [
  {
    title: "About Our Company",
    description:
      "We are a passionate team of digital innovators, designers, and developers dedicated to transforming ideas into extraordinary digital experiences. With years of combined experience in the industry, we specialize in creating cutting-edge solutions that drive business growth and user engagement.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-black">Innovation</h3>
          <p className="text-lg">Constantly pushing boundaries with creative solutions</p>
        </div>
      </div>
    ),
  },
  {
    title: "Our Mission",
    description:
      "To redefine the digital experience by delivering smart, seamless, and sustainable IT solutions that help businesses evolve with confidence."
 ,
    content: (
      <div className="h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-black">Quality</h3>
          <p className="text-lg">Delivering excellence in every project we undertake</p>
        </div>
      </div>
    ),
  },
  {
    title: "Our Values",
    description:
      "We value collaboration, working closely with clients as trusted partners. Our commitment to quality ensures that we deliver excellence in every project we undertake, creating impactful solutions that make a difference.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-black">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-black">Impact</h3>
          <p className="text-lg">Creating meaningful change through digital transformation</p>
        </div>
      </div>
    ),
  },
];

export default function AboutSection() {
  return (
    <div className="p-10 text-black ">
      <StickyScroll content={content} contentClassName={playfair_display.className} />
    </div>
  );
}
