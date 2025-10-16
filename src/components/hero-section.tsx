"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ServicesSection from "@/components/services-section";
import Bg from "../app/about/image/demo2.png";
import { Inter, Playfair_Display } from "next/font/google";
import conferenceRoom from "@/components/images/conference room 1.jpg";
import values from "@/components/images/ourvalue.jpg";
import mission from "@/components/images/ourmission.jpg";
import Image from "next/image";
import { url } from "inspector";
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
      <div className="  relative -mt-8 sm:-mt-12 lg:-mt-0 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10 bg-contain bg-center bg-white opacity-30"
          style={{ backgroundImage: `url(${Bg.src})` }}
        />

        {/* Sticky Scroll Reveal section */}
        <div className="relative z-10">
          <StickyScroll
            content={[
              {
                title: "Al Mawa International",
                description:
                  "At AL-MAWA International, We see technology not just as a set of tools, but as a bridge that empowers people and accelerates growth. As your digital growth partner, we combine innovation, strategy, and cutting-edge solutions to help businesses thrive in a fast-evolving world. ",
                content: (
                  <div className="h-full w-full flex items-center justify-center z-20">
                    <Image
                      src={conferenceRoom}
                      alt="about us"
                      className="object-cover h-full w-full rounded-lg shadow-2xl"
                      priority
                    />
                  </div>
                ),
              },
              {
                title: "Our Mission",
                description:
                  "Inspired by the belief that technology's true power lies in people, We're committed to redefining the digital experience through smart, seamless, and sustainable IT solutions. Our mission is to fuse creativity with technology, empowering every client to innovate boldly, perform efficiently, and lead confidently in this evolving digital world.",
                content: (
                  <div className="h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
                    <Image
                      src={mission}
                      alt="mission"
                      className="object-cover h-full w-full rounded-lg"
                    />
                  </div>
                ),
              },
              {
                title: "Our Values",
                description:
                  "We envision becoming a global symbol of trust, innovation, and transformation — a place where ideas turn into lasting impact, and technology serves as a catalyst for human progress, aspiring to create a future where every business, regardless of size, thrives through intelligent innovation, empowered teams, and limitless possibilities.",
                content: (
                  <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground">
                    <Image
                      src={values}
                      alt="values"
                      className="object-cover h-full w-full rounded-lg"
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Services section */}
        <div className="mt-22 bg-white relative z-10">
          <ServicesSection />
        </div>
      </div>

      {/* CTA Section */}
      {/* <CTASectionn /> */}

      {/* Testimonials section with infinite moving cards */}
     <div className="bg-gradient-to-b from-white via-gray-400 to-gray-950 py-16 px-4 md:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`${inter.className} text-4xl md:text-5xl font-bold pb-4 text-center text-black uppercase`}
            >
              voices from the desk
            </h2>
            <p
              className={`${playfair_display.className} text-lg text-black uppercase`}
            >
              Professional perspectives designed to inform, inspire, and empower
            </p>
          </div>
          <InfiniteMovingCards items={blog} direction="right" speed="slow" />
        </div>
      </div>

      {/* Footer Section */}
      {/* <FooterSection /> */}
    </div>

    // <div className="relative">
    //   {/* First screen: black to gray gradient with improved contrast */}
    //   <div className="min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 relative flex items-center justify-center">
    //     <GoogleGeminiEffect />
    //   </div>

    //   {/* Combined Sticky Scroll Reveal and Services section with seamless background */}
    //   <div className="bg-slate-50 relative -mt-8 sm:-mt-12 lg:-mt-0">
    //     {/* Sticky Scroll Reveal section */}
    //     <div>
    //       <StickyScroll
    //         content={[
    //           {
    //             title: "Al Mawa International",
    //             description:
    //               "At AL-Mawa International, we see technology not just as a set of tools, but as a bridge that empowers people and accelerates growth. As your digital growth partner, we combine innovation, strategy, and cutting-edge solutions to help businesses thrive in a fast-evolving world.",
    //             content: (
    //               <div className="h-full w-full flex items-center justify-center text-primary-foreground">
    //                 <Image
    //                   src={conferenceRoom}
    //                   alt="about us"
    //                   className="object-cover h-full w-full rounded-lg"
    //                   priority
    //                 />
    //               </div>
    //             ),
    //           },
    //           {
    //             title: "Our Mission",
    //             description:
    //               "Inspired by the belief that technology's true power lies in people, we're committed to redefining the digital experience through smart, seamless, and sustainable IT solutions. Our mission is to fuse creativity with technology, empowering every client to innovate boldly, perform efficiently, and lead confidently in this evolving digital world.",
    //             content: (
    //               <div className="h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
    //                 <Image
    //                   src={mission}
    //                   alt="mission"
    //                   className="object-cover h-full w-full rounded-lg"
    //                 />
    //               </div>
    //             ),
    //           },
    //           {
    //             title: "Our Values",
    //             description:
    //               "We envision becoming a global symbol of trust, innovation, and transformation — a place where ideas turn into lasting impact, and technology serves as a catalyst for human progress, aspiring to create a future where every business, regardless of size, thrives through intelligent innovation, empowered teams, and limitless possibilities.",
    //             content: (
    //               <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground">
    //                 <Image
    //                   src={values}
    //                   alt="values"
    //                   className="object-cover h-full w-full rounded-lg"
    //                 />
    //               </div>
    //             ),
    //           },
    //         ]}
    //       />
    //     </div>

    //     {/* Services section */}
    //     <div className="mt-24 bg-white">
    //       <ServicesSection />
    //     </div>
    //   </div>

    //   {/* CTA Section */}
    //   {/* <CTASectionn /> */}

    //   {/* Testimonials section with infinite moving cards - modernized */}
    //   <div className="bg-slate-50 py-20 sm:py-24 lg:py-32 px-4 md:px-6 lg:px-8 border-t border-slate-200">
    //     <div className="max-w-7xl mx-auto">
    //       <div className="text-center mb-16 sm:mb-20">
    //         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
    //           <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
    //             Voices from the Desk
    //           </span>
    //         </h2>
    //         <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light tracking-wide">
    //           Professional perspectives designed to inform, inspire, and empower
    //         </p>
    //       </div>
    //       <InfiniteMovingCards items={blog} direction="right" speed="slow" />
    //     </div>
    //   </div>

    //   {/* Footer Section */}
    //   {/* <FooterSection /> */}
    // </div>
  );
}
