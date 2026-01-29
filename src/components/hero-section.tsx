"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from 'next-intl';

import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import ServicesSection from "@/components/services-section";
import Bg from "../app/about/image/demo2.png";
import { Inter, Playfair_Display } from "next/font/google";
import conferenceRoom from "@/components/images/conference room 1.jpg";
import teamDiscuss from "@/app/about/image/team discuss.png";
// Use public images for mission and values (place files at public/our_mission.jpg and public/our_value.jpg)
// removed local imports

import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function HeroSection() {
  const t = useTranslations('home');
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
                title: t('companyTitle'),
                description: t('companyDescription'),
                content: (
                  <div className="h-full w-full flex items-center justify-center z-20">
                    <Image
                      src={teamDiscuss}
                      alt="AL-Mawa International"
                      className="object-cover h-full w-full rounded-lg shadow-2xl"
                      priority
                    />
                  </div>
                ),
              },
              {
                title: t('ourMissionTitle'),
                description: t('ourMissionDescription'),
                content: (
                  <div className="relative h-full w-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-black">
                    <Image
                      src="/our_mission.jpg"
                      alt="mission"
                      width={800}
                      height={500}
                      className="object-cover rounded-lg h-[300px] sm:h-[360px] md:h-[420px] lg:h-full w-full"
                      priority
                    />
                  </div>
                ),
              },
              {
                title: t('ourValuesTitle'),
                description: t('ourValuesDescription'),
                content: (
                  <div className="h-full w-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground">
                    <Image
                      src="/our_values2.jpg"
                      alt="Our Values"
                      width={800}
                      height={500}
                      className="object-cover rounded-lg h-[300px] sm:h-[360px] md:h-[420px] lg:h-full w-full"
                      priority
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
              {t('voicesFromDesk')}
            </h2>
            <p
              className={`${playfair_display.className} text-lg text-black uppercase`}
            >
              {t('voicesSubtitle')}
            </p>
          </div>
          <InfiniteMovingCards items={blog} direction="right" speed="slow" />
        </div>
      </div>

     
    </div>


   
  );
}
