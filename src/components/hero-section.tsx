import React, { useEffect, useState } from "react";
import axios from "axios";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ServicesSection from "@/components/services-section";

import { Inter, Playfair_Display } from "next/font/google";

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
              title: "About Our Company",
              description: "We are a passionate team of digital innovators, designers, and developers dedicated to transforming ideas into extraordinary digital experiences. With years of combined experience in the industry, we specialize in creating cutting-edge solutions that drive business growth and user engagement.",
              content: (
                <div className="h-full w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-black">Innovation</h3>
                    <p className="text-lg text-black">Constantly pushing boundaries with creative solutions</p>
                  </div>
                </div>
              ),
            },
            {
              title: "Our Mission",
              description: "Our mission is to bridge the gap between creativity and technology, delivering solutions that not only meet your needs but exceed your expectations. We believe in creating meaningful change through digital transformation.",
              content: (
                <div className="h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-black">Quality</h3>
                    <p className="text-lg text-black">Delivering excellence in every project we undertake</p>
                  </div>
                </div>
              ),
            },
            {
              title: "Our Values",
              description: "We value collaboration, working closely with clients as trusted partners. Our commitment to quality ensures that we deliver excellence in every project we undertake, creating impactful solutions that make a difference.",
              content: (
                <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-black">Impact</h3>
                    <p className="text-lg text-black">Creating meaningful change through digital transformation</p>
                  </div>
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
      {/* <CTASection /> */}
      
      {/* Testimonials section with infinite moving cards */}
      <div className="bg-gray-200 py-16 px-4 md:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${inter.className} text-4xl md:text-5xl font-bold pb-4 text-center text-black uppercase`}>
            From Our Experts to You
            </h2>
            <p className={`${playfair_display.className} text-lg text-black uppercase`}>
            “Read our articles, tutorials, and stories crafted by our team of professionals.”
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
