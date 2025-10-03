"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import TeamSection from "@/components/team";
import { Target, Eye, Heart, Users, Lightbulb, Award } from "lucide-react";
import Image from "next/image";
import { Inter, Playfair_Display, Archivo, Montserrat } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style.css";
import grpimage from "./image/grp image.jpg";
import visionimage from "./image/vision image.webp";
import missionimage from "./image/mission image.jpg";

gsap.registerPlugin(ScrollTrigger);

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const archivo = Archivo({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-archivo-black",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "700",
});

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run GSAP animation on desktop (lg and above)
    if (!containerRef.current || window.innerWidth < 1024) return;

    const panels =
      containerRef.current.querySelectorAll<HTMLDivElement>(".panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + containerRef.current!.offsetWidth,
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-background via-muted to-card">
      {/* Hero Section */}
      <motion.section
        className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* About us main */}
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className={`text-5xl md:text-6xl lg:text-9xl text-left pb-4 bg-clip-text text-transparent bg-black uppercase  ${montserrat.className}`}
            variants={fadeInUp}
          >
            About <br />{" "}
            <div className="flex flex-col justify-between lg:flex-row gap-4 lg:gap-0">
              <span className="flex flex-col order-1 lg:order-1 ">
                Us
                <motion.p
                  className={`text-base md:text-lg lg:text-sm font-light max-w-xs lg:max-w-3xs mx-auto lg:mx-0 leading-relaxed text-gray-500 py-2`}
                  variants={fadeInUp}
                >
                  We are a passionate team of digital innovators, designers, and
                  developers dedicated to transforming ideas into extraordinary
                  digital experiences. Our mission is to bridge the gap between
                  creativity and technology.
                </motion.p>
              </span>
              <div className="order-2 lg:order-2 flex justify-center lg:justify-start">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  width={450}
                  height={350}
                  className="rounded-4xl mt-3 w-full max-w-sm lg:max-w-none lg:w-auto"
                />
              </div>

              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-between order-3 lg:order-3 lg:ml-20 mt-6 lg:mt-0">
                <Image
                  src={grpimage}
                  alt="Our Team"
                  width={350}
                  height={50}
                  className="rounded-4xl mt-3 h-30 object-cover w-full max-w-sm "
                />
                <h4 className="text-xl lg:text-2xl font-bold text-black mt-4 lg:mt-0">Our Team</h4>
                <p className="text-sm max-w-sm text-gray-500 text-center lg:text-left px-4 lg:px-0">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Provident aut minus officia voluptas dolorem vero incidunt
                  corporis. Aliquid maxime tempore alias ipsam dolore pariatur
                  ex molestias error aspernatur! Repellendus, quasi!
                </p>
              </div>
            </div>
          </motion.h1>
          {/* <motion.p
            className={`text-lg md:text-xl tex-black max-w-3xl mx-auto leading-relaxed ${playfair_display.className}`}
            variants={fadeInUp}
          >
            We are a passionate team of digital innovators, designers, and
            developers dedicated to transforming ideas into extraordinary
            digital experiences. Our mission is to bridge the gap between
            creativity and technology.
          </motion.p> */}
        </div>
      </motion.section>

      {/* Two-Column Section our story */}
      {/* <motion.section
        className="py-16 px-4 md:px-6 lg:px-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Our team working together"
                  width={800}
                  height={500}
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2
                className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
              >
                Our Story
              </h2>
              <div
                className={`space-y-4 text-black ${playfair_display.className}`}
              >
                <p className="text-lg leading-relaxed">
                  Founded with a vision to revolutionize digital experiences,
                  we&apos;ve grown from a small team of dreamers to a dynamic
                  force in the tech industry. Our journey began with a simple
                  belief: technology should serve humanity, not the other way
                  around.
                </p>
                <p className="text-lg leading-relaxed">
                  Over the years, we&apos;ve partnered with startups,
                  enterprises, and everything in between, helping them navigate
                  the digital landscape with innovative solutions that drive
                  real results. Our approach combines cutting-edge technology
                  with human-centered design.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, we continue to push boundaries, explore new
                  possibilities, and create digital experiences that matter.
                  Every project is an opportunity to make a positive impact on
                  the world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      <div ref={containerRef} className="container hidden lg:flex">
        {/* panel one */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel one">
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our team working together"
                width={800}
                height={500}
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl flex justify-start font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
              Our Story
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed">
                Founded with a vision to revolutionize digital experiences,
                we&apos;ve grown from a small team of dreamers to a dynamic
                force in the tech industry. Our journey began with a simple
                belief: technology should serve humanity, not the other way
                around.
              </p>
              <p className="text-lg leading-relaxed">
                Over the years, we&apos;ve partnered with startups, enterprises,
                and everything in between, helping them navigate the digital
                landscape with innovative solutions that drive real results. Our
                approach combines cutting-edge technology with human-centered
                design.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we continue to push boundaries, explore new
                possibilities, and create digital experiences that matter. Every
                project is an opportunity to make a positive impact on the
                world.
              </p>
            </div>
          </motion.div>
        </div>
        {/* panel two */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel two">
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <Image
                src= {missionimage}
                alt="Our team working together"
                width={800}
                height={500}
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
               Our Mission
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed">
                To bridge the gap between creativity and technology, delivering solutions that exceed expectations and drive meaningful change.
              </p>
              <p className="text-lg leading-relaxed">
                Our mission is to create innovative and user-friendly digital experiences that help businesses and individuals achieve their goals.
              </p>
              <p className="text-lg leading-relaxed">
                We are committed to delivering exceptional results and making a positive impact on the world through our work.
              </p>
            </div>
          </motion.div>
        </div>
        {/* panel three */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel three">
          <motion.div variants={fadeInUp}>
            <div className="relative">
              <Image
                src={visionimage}
                alt="Our team working together"
                width={800}
                height={500}
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
               Our vision
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed"> 
                To be the leading digital agency in the world, delivering innovative and user-friendly solutions that help businesses and individuals achieve their goals.
              </p>
            </div>
          </motion.div>
        </div>

        {/* <div className="panel three">Passion</div> */}
        {/* <div className="panel four">Collaboration</div>
        <div className="panel five">Innovation</div>
        <div className="panel six">Excellence</div> */}
      </div>

      {/* Mobile-friendly sections - visible only on small screens */}
      <div className="lg:hidden">
        {/* Our Story - Mobile */}
        <motion.section
          className="py-16 px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <div className="relative mb-8">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Our team working together"
                    width={800}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2
                  className={`text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  Our Story
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed">
                    Founded with a vision to revolutionize digital experiences,
                    we&apos;ve grown from a small team of dreamers to a dynamic
                    force in the tech industry. Our journey began with a simple
                    belief: technology should serve humanity, not the other way
                    around.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Over the years, we&apos;ve partnered with startups, enterprises,
                    and everything in between, helping them navigate the digital
                    landscape with innovative solutions that drive real results. Our
                    approach combines cutting-edge technology with human-centered
                    design.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Today, we continue to push boundaries, explore new
                    possibilities, and create digital experiences that matter. Every
                    project is an opportunity to make a positive impact on the
                    world.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Mission - Mobile */}
        <motion.section
          className="py-16 px-4 md:px-6 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <div className="relative mb-8">
                  <Image
                    src={missionimage}
                    alt="Our mission"
                    width={800}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2
                 className={`text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  Our Mission
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed">
                    To bridge the gap between creativity and technology, delivering solutions that exceed expectations and drive meaningful change.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Our mission is to create innovative and user-friendly digital experiences that help businesses and individuals achieve their goals.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    We are committed to delivering exceptional results and making a positive impact on the world through our work.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Our Vision - Mobile */}
        <motion.section
          className="py-16 px-4 md:px-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <div className="relative mb-8">
                  <Image
                    src={visionimage}
                    alt="Our vision"
                    width={800}
                    height={400}
                    className="rounded-2xl shadow-2xl w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="space-y-6">
                <h2
                  className={`text-5xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  Our Vision
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed"> 
                    To be the leading digital agency in the world, delivering innovative and user-friendly solutions that help businesses and individuals achieve their goals.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Mission/Vision Section */}
      

      {/* Team Section */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <TeamSection />
      </motion.div>

      
    </div>
  );
}

