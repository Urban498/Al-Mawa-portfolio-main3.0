"use client";
{/*test */}
import React from "react";

export const dynamic = 'force-dynamic';
import { motion } from "framer-motion";
import Image from "next/image";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';
import TeamD from "../about/image/team discuss.png";
import GRP from "../about/image/grp.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
import conferenceRoom from "@/app/about/image/conference room 1.jpg";
import TeamSection from "@/components/team";

const inter = Inter({ subsets: ["latin"] });
const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "600",
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
  const t = useTranslations('about');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run GSAP animation on desktop (lg and above)
    if (typeof window === 'undefined' || !containerRef.current || window.innerWidth < 1024) return;

    const container = containerRef.current;
    const panels = container.querySelectorAll<HTMLDivElement>(".panel");

    // Set up the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate panels horizontally
    tl.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-background via-muted to-card">
      {/* SEO H1 Tag */}
      <h1 className="sr-only">
        About Al Mawa International Pune - Professional Web Development Team
      </h1>
      {/* Hero Section */}
      <motion.section
        className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* About us main */}
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center sm:text-left pb-4 bg-clip-text text-transparent bg-black ${montserrat.className}`}
            variants={fadeInUp}
          >
            <span className="text-black font-bold uppercase">{t('pageTitle')}</span> <br />{" "}
            <div className="flex flex-col justify-between xl:flex-row gap-4 xl:gap-6 2xl:gap-8">
              <span className="flex flex-col order-1 xl:order-1">
                <span className="uppercase text-center sm:text-left">{t('pageSubtitle')}</span>
                <motion.p
                  className={`text-sm sm:text-base md:text-lg xl:text-sm font-normal max-w-xs sm:max-w-sm md:max-w-md xl:max-w-xs 2xl:max-w-sm mx-auto xl:mx-0 leading-relaxed text-gray-500 py-2 text-center sm:text-left ${playfair_display.className}`}
                  variants={fadeInUp}
                >
                  {t('mainDescription')}
                </motion.p>
              </span>
              <div className="order-2 xl:order-2 flex justify-center xl:justify-start">
                <Image
                  src ={TeamD}
                  alt="Team collaboration"
                  width={450}
                  height={350}
                  className="rounded-4xl mt-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-none xl:w-auto h-auto object-cover"
                />
              </div>

              <div className="flex flex-col items-center xl:items-start justify-center xl:justify-around order-3 xl:order-3 xl:ml-12 2xl:ml-20 mt-6 xl:mt-0">
                <Image
                  src={GRP}
                  alt="Our Team"
                  width={350}
                  height={50}
                  className="rounded-4xl mt-3 h-35 sm:h-28 md:h-32 lg:h-46 xl:h-40 object-cover w-full max-w-xs sm:max-w-sm md:max-w-md xl:max-w-sm"
                />
                <h4 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl   text-black mt-4 xl:mt-2 2xl:mt-0 uppercase text-center xl:text-left">
                  {t('ourTeamTitle')}
                </h4>
                <p className={`text-xs sm:text-sm md:text-base xl:text-sm max-w-xs sm:max-w-sm md:max-w-md xl:max-w-sm text-gray-500 text-center xl:text-left px-4 xl:px-0 ${playfair_display.className}`}>
                {t('teamDescription')}
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

      {/* Desktop GSAP Horizontal Scroll */}
      <div ref={containerRef} className="container hidden lg:flex overflow-hidden" style={{ width: '300vw', height: '100vh' }}>
        {/* panel one */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel one min-w-screen px-8" style={{ width: '100vw' }}>
          <motion.div variants={fadeInUp}>
            <div className="relative w-full h-[400px] lg:h-[450px] xl:h-[500px]">
              <Image
                src={conferenceRoom}
                alt="Our team working together"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl flex justify-start font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
              {t('wayWeWorkTitle')}
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed">
              {t('wayWeWorkDescription')}
              </p>
              
            </div>
          </motion.div>
        </div>
        {/* panel two */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel two min-w-screen px-8" style={{ width: '100vw' }}>
          <motion.div variants={fadeInUp}>
          <div className="relative w-full h-[400px] lg:h-[450px] xl:h-[500px]">
              <Image
                src={conferenceRoom}
                alt="Our team working together"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
              {t('whyChooseUsTitle')}
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed">
              {t('whyChooseUsDescription')}
              </p>
            </div>
          </motion.div>
        </div>
        {/* panel three */}
        <div className="grid lg:grid-cols-2 gap-12 items-center panel three min-w-screen px-8" style={{ width: '100vw' }}>
          <motion.div variants={fadeInUp}>
          <div className="relative w-full h-[400px] lg:h-[450px] xl:h-[500px]">
              <Image
                src={conferenceRoom}
                alt="Our team working together"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2
              className={`text-3xl md:text-7xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase`}
            >
              {t('whatWeStandForTitle')}
            </h2>
            <div
              className={`space-y-4 text-black ${playfair_display.className}`}
            >
              <p className="text-lg leading-relaxed">
              {t('whatWeStandForDescription')}
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Mobile sections - same content as GSAP panels */}
      <div className="lg:hidden">
        {/* The Way We Work - Mobile */}
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
                    src={conferenceRoom}
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
                  className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  {t('wayWeWorkTitle')}
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('wayWeWorkDescription')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us - Mobile */}
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
                    src={conferenceRoom}
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
                  className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  {t('whyChooseUsTitle')}
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('whyChooseUsDescription')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* What We Stand For - Mobile */}
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
                    src={conferenceRoom}
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
                  className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-black ${inter.className} uppercase text-left`}
                >
                  {t('whatWeStandForTitle')}
                </h2>
                <div
                  className={`space-y-4 text-black ${playfair_display.className}`}
                >
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('whatWeStandForDescription')}
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
