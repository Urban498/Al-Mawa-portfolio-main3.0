"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const linearGradients = useMemo(() => [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
  ], []);

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  const titleVariants = {
    inactive: { x: -20, opacity: 0.3, transition: { duration: 0.4 } },
    active: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const descVariants = {
    inactive: { x: -10, opacity: 0.3, transition: { duration: 0.4 } },
    active: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative flex flex-col lg:flex-row h-auto lg:h-[30rem] justify-start lg:space-x-5 overflow-y-auto scrollbar-hide p-4 sm:p-6 lg:p-10  border-none "
      ref={ref}
    >
      
      <div className="w-full lg:w-[60%] mx-auto relative flex items-start px-2 sm:px-4">
        <div className="w-full lg:w-[50%] mx-auto">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-8 sm:my-12 lg:my-20">
              <motion.h2
                initial="inactive"
                animate={activeCard === index ? 'active' : 'inactive'}
                variants={titleVariants}
                className={`text-2xl sm:text-3xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 uppercase ${inter.className} [&]:!opacity-100 lg:[&]:opacity-[inherit]`}
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial="inactive"
                animate={activeCard === index ? 'active' : 'inactive'}
                variants={descVariants}
                className="text-sm sm:text-base lg:text-lg mt-4 sm:mt-6 lg:mt-10 max-w-full sm:max-w-lg text-gray-500 leading-relaxed  [&]:!opacity-100 lg:[&]:opacity-[inherit]"
              >
                {item.description}
              </motion.p>
              {/* Mobile content display */}
              <div className="lg:hidden mt-6 sm:mt-8">
                <div
                  style={{ background: backgroundGradient }}
                  className={cn(
                    "h-40 sm:h-48 w-full overflow-hidden rounded-md bg-white",
                    contentClassName,
                  )}
                >
                  {content[index].content ?? null}
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden lg:block h-100 w-100 overflow-hidden rounded-md bg-white cursor-grab active:cursor-grabbing",
          contentClassName,
        )}
        drag
        dragConstraints={{ left: -150, right: 150, top: -50, bottom: 50 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};
