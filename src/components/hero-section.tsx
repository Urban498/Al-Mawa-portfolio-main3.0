"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ServicesSection from "@/components/services-section";

import { Inter, Playfair_Display } from "next/font/google";
import conferenceRoom from "@/components/images/conference room 1.jpg"
import values from "@/components/images/ourvalue.jpg"
import mission from "@/components/images/ourmission.jpg"
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});


export default function HeroSection() {

  const [blog, setBlog] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("/api/card/[id]");
      setBlog(res.data?.data);
      console.log(res.data?.data);
      
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="relative">
     
      {/* First screen: black to gray gradient */}
      <div className="min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen bg-gradient-to-b from-background via-muted to-card relative flex items-center justify-center">
        <GoogleGeminiEffect />
      </div>
      
      {/* Combined Sticky Scroll Reveal and Services section with seamless background */}
      <div className="bg-gray-200 relative -mt-8 sm:-mt-12 lg:-mt-0">
        {/* Sticky Scroll Reveal section */}
        <div>
          <StickyScroll content={[
            {
              title: "Al Mawa International",
              description: "At AL-Mawa International, We see technology not just as a set of tools, but as a bridge that empowers people and accelerates growth. As your digital growth partner, we combine innovation, strategy, and cutting-edge solutions to help businesses thrive in a fast-evolving world. ",
              content: (
                <div className="h-full w-full  flex items-center justify-center text-primary-foreground">

                    <Image src={conferenceRoom} alt="about us"  className="object-cover h-full w-full" />
                </div>
              ),
            },
            {
              title: "Our Mission",
              description: "Inspired by the belief that technology’s true power lies in people, We're committed to redefining the digital experience through smart, seamless, and sustainable IT solutions. Our mission is to fuse creativity with technology, empowering every client to innovate boldly, perform efficiently, and lead confidently in this evolving digital world.",
              content: (
                <div className="h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
                  
                    <Image src={mission} alt="mission" className="object-cover h-full w-full"/>
                
                </div>
              ),
            },
            {
              title: "Our Values",
              description: "We envision becoming a global symbol of trust, innovation, and transformation  a place where ideas turn into lasting impact, and technology serves as a catalyst for human progress, aspiring to create a future where every business, regardless of size, thrives through intelligent innovation, empowered teams, and limitless possibilities.",
              content: (
                <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground">
                  
                    <Image src={values} alt="values" className="object-cover h-full w-full"/>
                  
                </div>
              ),
            },
          ]} />
        </div>
        
        {/* Services section */}
        <div className="mt-22 bg-white">
          <ServicesSection />
        </div>
      </div>
      
      {/* CTA Section */}
      {/* <CTASectionn /> */}
      
      
      {/* Testimonials section with infinite moving cards */}
      <div className="bg-gray-200 py-16 px-4 md:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${inter.className} text-4xl md:text-5xl font-bold pb-4 text-center text-black uppercase`}>
            voices from the desk
            </h2>
            <p className={`${playfair_display.className} text-lg text-black uppercase`}>
            Professional perspectives designed to inform, inspire, and empower
            </p>
          </div>
          <InfiniteMovingCards
            items={blog}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
      
      {/* Footer Section */}
      {/* <FooterSection /> */}
    </div>
  );
}
